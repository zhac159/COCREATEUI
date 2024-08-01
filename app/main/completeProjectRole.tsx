import { usePostApiProjectRoleComplete } from "@/common/api/endpoints/cocreateApi";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { View, Text } from "react-native-animatable";
import { useMemo, useState } from "react";
import { ProjectRoleCompleteDTO, ReviewCreateDTO } from "@/common/api/model";
import CompleteProjectReviewAssignee from "@/components/CompleteProject/CompletedProjectReviewAssignee";
import {
  useAssignedProjectsState,
  useUserIdValue,
} from "@/components/RecoilStates/profileState";
import { EntityType } from "@/components/Account/Common/Media/EntityType";
import { usePrepareAndUpload } from "@/common/media/mediaHooks";
import { getMediaCreateDTOs } from "@/components/Account/Common/Media/mediaHelper";
import CompleteProjectUploadPhoto from "@/components/CompleteProject/CompleteProjectUploadPhoto";
import CompleteProjectDescription from "@/components/CompleteProject/CompleteProjectDescription";
import NextButton from "@/components/Project/Common/NextButton";
import CompletedProjectConfirmation from "@/components/CompleteProject/CompletedProjectConfirmation";
import { useTranslation } from "react-i18next";

export default function CompleteProjectRole() {
  const params = useLocalSearchParams();
  const projectId = parseInt(params.projectId as string, 10);
  const userId = useUserIdValue();

  const { t } = useTranslation();

  const router = useRouter();

  const [formStep, setFormStep] = useState(0);

  const [assignedProjects, setAssignedProjects] = useAssignedProjectsState();
  const assignedProject = useMemo(
    () =>
      assignedProjects
        ? assignedProjects.find((p) => p.id === projectId)
        : null,
    [assignedProjects]
  );

  const { upload, isLoading: isUploadingImages } = usePrepareAndUpload(
    EntityType.EXPERIENCE
  );

  const [uris, setUris] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [reviews, setReviews] = useState<ReviewCreateDTO[]>([]);

  const { mutate: completeProjectRole } = usePostApiProjectRoleComplete({
    mutation: {
      onSuccess: () => {
        setAssignedProjects((prev) => {
          if (!prev) return prev;
          return prev.filter((p) => p.id !== projectId);
        });
        router.back();
      },
    },
  });

  const handleCompleteProjectRole = async () => {
    const urls = await upload(uris);
    const createMedias = getMediaCreateDTOs(urls);

    const assignedRole = assignedProject!.projectRoles!.find(
      (pr) => pr.assignee?.userId === userId
    );

    if (!assignedRole) return;

    const projectRoleCompleteDTO: ProjectRoleCompleteDTO = {
      id: assignedRole.id,
      description: description,
      medias: createMedias,
      reviews: reviews,
    };

    completeProjectRole({ data: projectRoleCompleteDTO });
  };

  if (!assignedProject) return <Text>Loading...</Text>;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        {formStep === 0 && (
          <CompleteProjectUploadPhoto setUris={setUris} uris={uris} />
        )}
        {formStep === 1 && (
          <CompleteProjectDescription
            description={description}
            setDescription={setDescription}
          />
        )}
        {formStep === 2 && (
          <CompleteProjectReviewAssignee
            reviewed={assignedProject.projectManager!}
            onReviewChange={(review) => {
              setReviews((prev) => {
                const newReviews = [...prev];
                newReviews[0] = review;
                return newReviews;
              });
            }}
          />
        )}
        {formStep === 3 && (
          <CompletedProjectConfirmation project={assignedProject} 
            description={t('projects.complete-role.description')}
          />
        )}
        <NextButton
          text={formStep === 3 ? "Finish Project" : "Next"}
          icon={formStep === 3 ? "check" : "arrow-right"}
          onPress={() => {
            formStep === 3
              ? handleCompleteProjectRole()
              : setFormStep((prev) => prev + 1);
          }}
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 30,
    paddingTop: "20%",
    paddingHorizontal: 29,
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
