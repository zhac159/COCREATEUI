import { Coins } from "@/common/components/Coins";
import { ScrollViewWrapper } from "@/common/components/ScrollViewWrapper";
import StyledButton from "@/common/components/StyledComponents/StyledButton";
import { useAuthStore } from "@/common/stores/authStore";

export default function Account() {
  const logOut = useAuthStore((state) => state.logOut);
  return (
    <ScrollViewWrapper>
      <StyledButton text="dsa" onPress={logOut} />
      <Coins value={500} />
    </ScrollViewWrapper>
  );
}
