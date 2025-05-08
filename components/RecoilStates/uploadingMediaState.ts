// import {
//   atom,
//   atomFamily,
//   useRecoilState,
//   useRecoilValue,
//   useSetRecoilState,
// } from "recoil";

// export const uploadingMediaFamily = atomFamily<number, string>({
//   key: "uploadingMediaFamily",
//   default: 0,
// });

// export const useUploadingMediaFamilyState = (key: string) =>
//   useRecoilState(uploadingMediaFamily(key));
// export const useUploadingMediaFamilyValue = (key: string) =>
//   useRecoilValue(uploadingMediaFamily(key));
// export const useSetUploadingMediaFamilyState = (key: string) =>
//   useSetRecoilState(uploadingMediaFamily(key));

// export const useUpdateUploadingMediaState = () => {
//   const setUploadingMediaState = useSetRecoilState(uploadingMediaFamily);
//   return (id: string, progress: number) => {
//     setUploadingMediaState(id)(progress);
//   };
// };