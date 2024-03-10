import { FC, useState } from "react";
import { useTheme } from "../../Themes/theme";
import CancelButton from "../CancelButton";
import NextButton from "../NextButton";
import {
  usePostApiPrepare,
  usePostApiProjectRole,
  usePutApiProjectRole,
} from "@/common/api/endpoints/cocreateApi";
import { Skills, getSkill } from "@/components/Account/Skills/skillHelper";
import ProjectAddRoleSkill from "./ProjectAddRoleSkill";
import ProjectAddRoleTitleDescription from "./ProjecAddRoleTitleDescription";
import ProjectAddRoleKeywords from "./ProjectAddRoleKeywords";
import ProjectAddRoleImages from "./ProjectAddRoleTitleImages";
import ProjectAddRoleCost from "./ProjectAddRoleCost";
import ProjectAddRoleWhenWhereHowLong from "./ProjectAddRoleWhenWhereHowLong/ProjectAddRoleWhenWhereHowLong";
import { useSetProjectState } from "@/components/RecoilStates/profileState";
import {
  getCleanUrl,
  getMediaTypeFromUri,
  uploadFiles,
} from "@/components/Account/Common/Media/mediaHelper";
import {
  MediaCreateDTO,
  MediaUpdateDTO,
  PrepareUploadDTO,
  ProjectRoleCreateDTO,
  ProjectRoleDTO,
  ProjectRoleUpdateDTO,
} from "@/common/api/model";
import { EntityType } from "@/components/Account/Common/Media/EntityType";
import { View, Text } from "react-native";
import SkillIcon from "@/components/Account/Skills/SkillIcon";
import FormStepIndicator from "./ProjectAddRoleStepFormIndicator";

type ProjectAddRoleFormProps = {
  exitForm: () => void;
  projectId: number;
  editRole?: ProjectRoleDTO;
};

const ProjectAddRoleForm: FC<ProjectAddRoleFormProps> = ({
  exitForm,
  projectId,
  editRole,
}) => {
  const theme = useTheme();

  const setProject = useSetProjectState();

  const [formStep, setFormStep] = useState(0);

  const [skill, setSkill] = useState<Skills | undefined>(
    editRole?.skillType === undefined ? undefined : editRole?.skillType
  );
  const [title, setTitle] = useState<string>(editRole?.name || "");
  const [description, setDescription] = useState<string>(
    editRole?.description || ""
  );
  const [keywords, setKeywords] = useState<string>(
    editRole?.keywords?.join(",") || ""
  );
  const [uris, setUris] = useState<string[]>(
    editRole?.medias
      ? editRole.medias
          .map((media) => media.uri)
          .filter((uri): uri is string => !!uri)
      : []
  );
  const [startDate, setStartDate] = useState<Date>(
    editRole?.startDate ? new Date(editRole?.startDate) : new Date()
  );
  const [endDate, setEndDate] = useState<Date>(
    editRole?.endDate ? new Date(editRole?.endDate) : new Date()
  );
  const [effort, setEffort] = useState<number>(editRole?.effort || 0);
  const [hours, setHours] = useState<boolean>(
    editRole?.effort ? editRole?.effort > 23 : false
  );
  const [cost, setCost] = useState<number>(editRole?.cost || 0);
  const [longitude, setLongitude] = useState<number>(editRole?.longitude || 0);
  const [latitude, setLatitude] = useState<number>(editRole?.latitude || 0);
  const [address, setAddress] = useState<string>(editRole?.address || "");
  const [remote, setRemote] = useState<boolean>(editRole?.remote || false);

  const { mutate: createProjectRole } = usePostApiProjectRole({
    mutation: {
      onSuccess: (data) => {
        setProject((state) => {
          const currentState = state || [];

          const projectIndex = currentState.findIndex(
            (project) => project.id === projectId
          );

          if (projectIndex === -1) {
            return currentState;
          }

          const newState = [...currentState];

          const project = { ...newState[projectIndex] };

          if (project.projectRoles) {
            project.projectRoles = [...project.projectRoles, data];
          } else {
            project.projectRoles = [data];
          }

          newState[projectIndex] = project;
          return newState;
        });

        exitForm();
      },
    },
  });

  const { mutate: updateProjectRole } = usePutApiProjectRole({
    mutation: {
      onSuccess: (data) => {
        setProject((state) => {
          const currentState = state || [];

          const newState = [...currentState];

          const project = { ...newState[0] };

          if (project.projectRoles) {
            const index = project.projectRoles.findIndex(
              (role) => role.id === data.id
            );
            if (index !== -1) {
              const newProjectRoles = [...project.projectRoles];
              newProjectRoles[index] = data;
              const newProject = { ...project, projectRoles: newProjectRoles };
              newState[0] = newProject;
            }
          } else {
            const newProject = { ...project, projectRoles: [data] };
            newState[0] = newProject;
          }

          return newState;
        });

        exitForm();
      },
    },
  });

  const { mutate: prepareDownload } = usePostApiPrepare({
    mutation: {
      onSuccess: (data) => {
        const sasURIs = data.sasURIs;

        if (sasURIs) {
          uploadFiles(data.sasURIs || [], uris);

          if (!editRole) {
            let newMedias: MediaCreateDTO[] = [];
            newMedias =
              uris.map((_, index) => {
                const cleanUrl = getCleanUrl(sasURIs[index] || "");
                const newMedia: MediaCreateDTO = {
                  uri: cleanUrl,
                  mediaType: getMediaTypeFromUri(cleanUrl),
                };
                return newMedia;
              }) || [];

            const NewProjectRole: ProjectRoleCreateDTO = {
              medias: newMedias,
              name: title,
              skillType: skill,
              description: description,
              keywords: keywords.split(",").map((keyword) => keyword.trim()),
              startDate: startDate.toISOString(),
              endDate: endDate.toISOString(),
              effort: effort * (hours ? 1 : 24),
              cost: cost,
              longitude: longitude,
              latitude: latitude,
              address: address,
              remote: remote,
              projectId: projectId,
            };
            createProjectRole({ data: NewProjectRole });
          } else {
            const cleanUris = sasURIs.map((uri) => getCleanUrl(uri || ""));

            let updatedMedias: MediaUpdateDTO[] = cleanUris.map(
              (uri, index) => {
                const newMedia: MediaUpdateDTO = {
                  id: editRole?.medias?.[index]?.id,
                  uri: uri,
                  mediaType: getMediaTypeFromUri(uri),
                };
                return newMedia;
              }
            );

            const updatedProjectRole: ProjectRoleUpdateDTO = {
              medias: updatedMedias,
              name: title,
              skillType: skill,
              description: description,
              keywords: keywords.split(",").map((keyword) => keyword.trim()),
              startDate: startDate.toISOString(),
              endDate: endDate.toISOString(),
              effort: effort * (hours ? 1 : 24),
              cost: cost,
              longitude: longitude,
              latitude: latitude,
              address: address,
              remote: remote,
              id: editRole?.id || 0,
            };
            updateProjectRole({ data: updatedProjectRole });
          }
        }
      },
    },
  });

  const handleCreate = () => {
    const prepareUploadSubmission: PrepareUploadDTO[] =
      uris.map((uri: string) => {
        const prepareUpload: PrepareUploadDTO = {
          entity: EntityType.PROJECTROLE,
          mediaType: getMediaTypeFromUri(uri),
        };
        return prepareUpload;
      }) || [];
    prepareDownload({ data: prepareUploadSubmission });
  };

  const handleUpdate = () => {
    if (!uris[0].startsWith("http")) {
      const prepareUploadSubmission: PrepareUploadDTO[] =
        uris.map((uri: string) => {
          const prepareUpload: PrepareUploadDTO = {
            entity: EntityType.PROJECTROLE,
            mediaType: getMediaTypeFromUri(uri),
          };
          return prepareUpload;
        }) || [];
      prepareDownload({ data: prepareUploadSubmission });
    } else {
      const updatedProjectRole: ProjectRoleUpdateDTO = {
        medias: editRole?.medias,
        name: title,
        skillType: skill,
        description: description,
        keywords: keywords.split(",").map((keyword) => keyword.trim()),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        effort: effort * (hours ? 1 : 24),
        cost: cost,
        longitude: longitude,
        latitude: latitude,
        address: address,
        remote: remote,
        id: editRole?.id || 0,
      };
      updateProjectRole({ data: updatedProjectRole });
    }
  };

  const handleFormLastStep = () => {
    if (!editRole) {
      handleCreate();
    } else {
      handleUpdate();
    }
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 11,
          }}
        >
          <SkillIcon skillType={skill} />
          <Text
            style={{
              ...theme.customFonts.primary.medium,
              color: theme.colors.black,
            }}
          >
            {getSkill(skill)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 11,
          }}
        >
          <FormStepIndicator
            steps={6}
            currentStep={formStep}
            onStepChange={(step) => setFormStep(step)}
          />
          <CancelButton onPress={exitForm} />
        </View>
      </View>
      {formStep === 0 && (
        <ProjectAddRoleSkill skill={skill} setSkill={setSkill} />
      )}
      {formStep === 1 && (
        <ProjectAddRoleTitleDescription
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          skill={skill}
        />
      )}
      {formStep === 2 && (
        <ProjectAddRoleKeywords
          keywords={keywords}
          setKeywords={setKeywords}
          skill={skill}
        />
      )}
      {formStep === 3 && (
        <ProjectAddRoleImages uris={uris} setUris={setUris} skill={skill} />
      )}
      {formStep === 4 && (
        <ProjectAddRoleWhenWhereHowLong
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          effort={effort}
          setEffort={setEffort}
          hours={hours}
          setHours={setHours}
          longitude={longitude}
          setLongitude={setLongitude}
          latitude={latitude}
          setLatitude={setLatitude}
          address={address}
          setAddress={setAddress}
          remote={remote}
          setRemote={setRemote}
          skill={skill}
        />
      )}
      {formStep === 5 && <ProjectAddRoleCost cost={cost} setCost={setCost} />}
      <NextButton
        text={formStep === 5 ? "Finish Role" : "Next"}
        icon="arrow-right"
        onPress={() => {
          formStep === 5 ? handleFormLastStep() : setFormStep(formStep + 1);
        }}
      />
    </>
  );
};

export default ProjectAddRoleForm;
