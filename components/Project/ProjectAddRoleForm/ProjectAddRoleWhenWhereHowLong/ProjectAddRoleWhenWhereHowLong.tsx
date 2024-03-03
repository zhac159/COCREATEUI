import { useTheme } from "@/components/Themes/theme";
import { Dispatch, FC, SetStateAction } from "react";
import { Text } from "react-native";
import ProjectAddRoleWhere from "./ProjectAddRoleWhere";
import ProjectAddRoleWhen from "./ProjectAddRoleWhen";
import ProjectAddRoleHowLong from "./ProjectAddRoleHowLong";
import { Skills } from "@/components/Account/Skills/skillHelper";

type ProjectAddRoleWhenWhereHowLongProps = {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
  setEndDate: Dispatch<SetStateAction<Date>>;
  effort: number;
  setEffort: Dispatch<SetStateAction<number>>;
  hours: boolean;
  setHours: Dispatch<SetStateAction<boolean>>;
  longitude: number;
  setLongitude: Dispatch<SetStateAction<number>>;
  latitude: number;
  setLatitude: Dispatch<SetStateAction<number>>;
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
  remote: boolean;
  setRemote: Dispatch<SetStateAction<boolean>>;
  skill: Skills | undefined;
};

const ProjectAddRoleWhenWhereHowLong: FC<
  ProjectAddRoleWhenWhereHowLongProps
> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  effort,
  setEffort,
  hours,
  setHours,
  longitude,
  setLongitude,
  address,
  setAddress,
  latitude,
  setLatitude,
  remote,
  setRemote,
  skill,
}) => {
  const theme = useTheme();

  return (
    <>
      <Text
        style={{
          ...theme.customFonts.secondary.large,
          fontWeight: "400",
          fontSize: 35,
        }}
      >
        When, Where, How Long ?
      </Text>
      <ProjectAddRoleWhere
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
      <ProjectAddRoleWhen
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        skill={skill}
      />
      <ProjectAddRoleHowLong
        effort={effort}
        setEffort={setEffort}
        hours={hours}
        setHours={setHours}
        skill={skill}
      />
    </>
  );
};

export default ProjectAddRoleWhenWhereHowLong;
