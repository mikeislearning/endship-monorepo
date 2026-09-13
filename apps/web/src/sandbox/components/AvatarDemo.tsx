import {
  AwAvatar,
  AwAvatarFallback,
  AwAvatarImage,
} from "@/components/AwAvatar";

export const AvatarDemo = () => {
  return (
    <div className="flex flex-row flex-wrap items-center gap-4">
      <AwAvatar>
        <AwAvatarImage
          src="https://github.com/PaintingWithCode.png"
          alt="@PaintingWithCode"
        />
        <AwAvatarFallback>AM</AwAvatarFallback>
      </AwAvatar>
      <AwAvatar>
        <AwAvatarFallback>AM</AwAvatarFallback>
      </AwAvatar>
      <AwAvatar className="size-12">
        <AwAvatarImage
          src="https://github.com/PaintingWithCode.png"
          alt="@PaintingWithCode"
        />
        <AwAvatarFallback>AM</AwAvatarFallback>
      </AwAvatar>
      <AwAvatar className="rounded-lg">
        <AwAvatarImage
          src="https://github.com/mikeislearning.png"
          alt="@mikeislearning"
        />
        <AwAvatarFallback>MM</AwAvatarFallback>
      </AwAvatar>
      <div className="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
        <AwAvatar>
          <AwAvatarImage
            src="https://github.com/PaintingWithCode.png"
            alt="@PaintingWithCode"
          />
          <AwAvatarFallback>AM</AwAvatarFallback>
        </AwAvatar>
        <AwAvatar>
          <AwAvatarImage
            src="https://github.com/nicolas-rohricht.png"
            alt="@nicolas-rohricht"
          />
          <AwAvatarFallback>NR</AwAvatarFallback>
        </AwAvatar>
        <AwAvatar>
          <AwAvatarImage
            src="https://github.com/mikeislearning.png"
            alt="@mikeislearning"
          />
          <AwAvatarFallback>MM</AwAvatarFallback>
        </AwAvatar>
      </div>
      <div className="flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
        <AwAvatar>
          <AwAvatarImage
            src="https://github.com/PaintingWithCode.png"
            alt="@PaintingWithCode"
          />
          <AwAvatarFallback>AM</AwAvatarFallback>
        </AwAvatar>
        <AwAvatar>
          <AwAvatarImage
            src="https://github.com/nicolas-rohricht.png"
            alt="@nicolas-rohricht"
          />
          <AwAvatarFallback>NR</AwAvatarFallback>
        </AwAvatar>
        <AwAvatar>
          <AwAvatarImage
            src="https://github.com/mikeislearning.png"
            alt="@mikeislearning"
          />
          <AwAvatarFallback>MM</AwAvatarFallback>
        </AwAvatar>
      </div>
      <div className="flex -space-x-2 hover:space-x-1 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale *:data-[slot=avatar]:transition-all *:data-[slot=avatar]:duration-300 *:data-[slot=avatar]:ease-in-out">
        <AwAvatar>
          <AwAvatarImage
            src="https://github.com/PaintingWithCode.png"
            alt="@PaintingWithCode"
          />
          <AwAvatarFallback>AM</AwAvatarFallback>
        </AwAvatar>
        <AwAvatar>
          <AwAvatarImage
            src="https://github.com/nicolas-rohricht.png"
            alt="@nicolas-rohricht"
          />
          <AwAvatarFallback>NR</AwAvatarFallback>
        </AwAvatar>
        <AwAvatar>
          <AwAvatarImage
            src="https://github.com/mikeislearning.png"
            alt="@mikeislearning"
          />
          <AwAvatarFallback>MM</AwAvatarFallback>
        </AwAvatar>
      </div>
    </div>
  );
};
