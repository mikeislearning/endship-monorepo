import { Fragment } from "react/jsx-runtime";

import { AwScrollArea, AwScrollBar } from "@/components/AwScrollArea";
import { AwSeparator } from "@/components/AwSeparator";
import { AwText } from "@/components/AwText/AwText";

export const ScrollAreaDemo = () => {
  return (
    <div className="flex flex-col gap-6">
      <ScrollAreaVertical />
      <ScrollAreaHorizontalDemo />
    </div>
  );
};

const TAGS = Array.from({ length: 50 }).map(
  // eslint-disable-next-line max-params
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

const ScrollAreaVertical = () => {
  return (
    <div className="flex flex-col gap-6">
      <AwScrollArea className="h-72 w-48 rounded-md border">
        <div className="p-4">
          <AwText
            variant="mdMedium"
            className="mb-4"
            i18nKey="sandbox:scrollArea.tags"
          />
          {TAGS.map(tag => (
            <Fragment key={tag}>
              <AwText>{tag}</AwText>
              <AwSeparator className="my-2" />
            </Fragment>
          ))}
        </div>
      </AwScrollArea>
    </div>
  );
};

const WORKS = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyav",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
] as const;

const ScrollAreaHorizontalDemo = () => {
  return (
    <AwScrollArea className="w-full max-w-96 rounded-md border p-4">
      <div className="flex gap-4">
        {WORKS.map(artwork => (
          <figure key={artwork.artist} className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <img
                src={artwork.art}
                alt={`Photo by ${artwork.artist}`}
                className="aspect-3/4 h-fit w-37.5 object-cover"
              />
            </div>
            <AwText
              as="figcaption"
              variant="sm"
              i18nKey="sandbox:scrollArea.photoBy"
              i18nOptions={{ artist: artwork.artist }}
              i18nProps={{
                components: {
                  bold: (
                    <AwText
                      as="span"
                      variant="smBold"
                      className="text-foreground"
                    />
                  ),
                },
              }}
              className="pt-2 text-muted-foreground"
            />
          </figure>
        ))}
      </div>
      <AwScrollBar orientation="horizontal" />
    </AwScrollArea>
  );
};
