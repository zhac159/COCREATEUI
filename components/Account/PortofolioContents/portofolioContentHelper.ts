import { PortofolioContentDTO } from "@/common/api/model";

export function getUpdatedImages(portofolioContents: PortofolioContentDTO[]) {
  const newUris: string[] = [];

  if (!portofolioContents) return newUris;

  portofolioContents.forEach((content) => {
    content.medias?.forEach((media) => {
      if (media.uri && !media.uri.startsWith("http")) {
        newUris.push(media.uri);
      }
    });
  });

  return newUris;
}

export function applyNewUrlsToPortofolioContents(
  portofolioContents: PortofolioContentDTO[],
  newUris: string[]
) {
  let index = 0;

  var updatedPortofolio = portofolioContents.map((content) => {
    return {
      ...content,
      medias: content.medias?.map((media) => {
        if (!media.uri.startsWith("http")) {
          const newMedia = { ...media, uri: newUris[index] };
          index++;
          return newMedia;
        }
        return media;
      }),
    };
  });

  return updatedPortofolio;
}
