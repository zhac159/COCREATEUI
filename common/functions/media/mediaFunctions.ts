// import { MediaCreateDTO } from "@/common/api/model";

// // handleSubmit(async (data) => {
// //     setIsLoading(true);
    
// //     const uris = data.medias
// //       .filter((media) => !!media)
// //       .map((media) => media.uri);

// //     const uploadedUrls = await upload(uris);
// //     data.medias = getMediaCreateDTOsFromUris(uploadedUrls);
// //     createPortofolioContent({ data });
// //   })();

// const uploadMediaCreateDTOs = async (mediaDTOs: MediaCreateDTO[]): Promise<MediaCreateDTO[]> => {

//     const urisToUpload = mediaDTOs.filter((media) => !!media).map((media) => media.uri);
//     const uploadedUrls = await upload(urisToUpload);
// }