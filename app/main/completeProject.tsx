import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { useProjectState } from "@/components/RecoilStates/profileState";
import CompleteProjectUploadPhoto from "@/components/CompleteProject/CompleteProjectUploadPhoto";
import { getAssignedRoles } from "@/components/CompleteProject/completedProjectHelper";
import { ProjectCompleteDTO, ReviewCreateDTO } from "@/common/api/model";
import CompleteProjectReviewAssignee from "@/components/CompleteProject/CompletedProjectReviewAssignee";
import CompletedProjectConfirmation from "@/components/CompleteProject/CompletedProjectConfirmation";
import CompleteProjectDescription from "@/components/CompleteProject/CompleteProjectDescription";
import { usePrepareAndUpload } from "@/common/media/mediaHooks";
import { EntityType } from "@/components/Account/Common/Media/EntityType";
import { usePostApiProjectComplete } from "@/common/api/endpoints/cocreateApi";
import { getMediaCreateDTOs } from "@/components/Account/Common/Media/mediaHelper";
import StyledButton from "@/components/Common/StyledButton";
import GoBackButton from "@/components/Common/goBackButton";
import { useTranslation } from "react-i18next";
import { windowHeight } from "@/components/Account/Common/getWindowDimensions";

export default function CompleteProject() {
  const { upload, isLoading: isUploadingImages } = usePrepareAndUpload(
    EntityType.EXPERIENCE
  );

  const { t } = useTranslation();

  const router = useRouter();

  const params = useLocalSearchParams();
  const projectId = parseInt(params.projectId as string, 10);

  const [projects, setProjects] = useProjectState();

  const { mutate: completeProject } = usePostApiProjectComplete({
    mutation: {
      onSuccess: () => {
        setProjects((prev) => {
          if (!prev) return prev;
          return prev.filter((p) => p.id !== projectId);
        });
        router.back();
      },
    },
  });

  const project = useMemo(
    () => (projects ? projects.find((p) => p.id === projectId) : null),
    [projects]
  );

  const [formStep, setFormStep] = useState(0);

  const assignesProjectRoles = useMemo(
    () => (project ? getAssignedRoles(project) : []),
    [project]
  );

  const lastFormStepIndex = useMemo(
    () => assignesProjectRoles.length + 2,
    [project]
  );

  const [uris, setUris] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [reviews, setReviews] = useState<ReviewCreateDTO[]>([]);

  const handleCompleteProject = async () => {
    const urls = await upload(uris);

    const createMedias = getMediaCreateDTOs(urls);

    const projectCompleteDTO: ProjectCompleteDTO = {
      description: description,
      id: projectId,
      medias: createMedias,
      reviews: reviews,
    };

    completeProject({ data: projectCompleteDTO });
  };

  if (!project) return <Text>Loading...</Text>;

  return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          minHeight: windowHeight,
        }}
      >
        <KeyboardAvoidingView style={styles.container}>
          <GoBackButton />
          <View>
            {formStep === 0 && (
              <CompleteProjectUploadPhoto setUris={setUris} uris={uris} />
            )}
            {formStep === 1 && (
              <CompleteProjectDescription
                description={description}
                setDescription={setDescription}
              />
            )}
            {assignesProjectRoles.map(
              (role, index) =>
                formStep === index + 2 && (
                  <CompleteProjectReviewAssignee
                    key={index}
                    roleSkill={role.skillType!}
                    reviewed={role.assignee!}
                    onReviewChange={(review) => {
                      const newReviews = [...reviews];
                      newReviews[index] = review;
                      setReviews(newReviews);
                    }}
                  />
                )
            )}
            {formStep === lastFormStepIndex && (
              <CompletedProjectConfirmation
                project={project}
                description={t("projects.complete-role.description")}
              />
            )}
          </View>
          <StyledButton
            text={formStep === lastFormStepIndex ? "Finish Project" : "Next"}
            icon={formStep === lastFormStepIndex ? "check" : "arrow-right"}
            onPress={() => {
              formStep === lastFormStepIndex
                ? handleCompleteProject()
                : setFormStep((prev) => prev + 1);
            }}
          />
        </KeyboardAvoidingView>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: "20%",
    paddingTop: "15%",
    paddingHorizontal: 29,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
