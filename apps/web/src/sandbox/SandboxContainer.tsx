import { Component, ComponentPropsWithoutRef, ReactNode } from "react";

import { AwText } from "@/components/AwText/AwText";
import { I18nKeyType } from "@/i18n";
import { appLogger } from "@/utils/logger";
import { cn } from "@/utils/tailwind";

import { getComponentId } from "./helpers";

type SandboxContainerPropsType = ComponentPropsWithoutRef<"div"> & {
  name: string;
  descriptionI18nKey?: I18nKeyType;
};

export const SandboxContainer = ({
  className,
  name,
  descriptionI18nKey,
  children,
  ...props
}: SandboxContainerPropsType) => {
  const componentId = getComponentId(name);
  return (
    <ComponentErrorBoundary name={name}>
      <div
        id={componentId}
        data-name={componentId}
        className={cn(
          "flex w-full scroll-mt-16 flex-col rounded-lg border",
          className,
        )}
        {...props}>
        <div className="border-b px-4 py-3">
          <AwText variant="lgMedium">{name}</AwText>
          {descriptionI18nKey && (
            <AwText
              variant="sm"
              className="mt-0.5 text-muted-foreground"
              i18nKey={descriptionI18nKey}
            />
          )}
        </div>
        <div className="flex flex-1 items-center gap-2 p-4">{children}</div>
      </div>
    </ComponentErrorBoundary>
  );
};

class ComponentErrorBoundary extends Component<
  { children: ReactNode; name: string },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; name: string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    appLogger.error({
      message: `Error in component ${this.props.name}`,
      error,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <AwText
          className="p-4 text-red-500"
          i18nKey="sandbox:components.errorMessage"
          i18nOptions={{ name: this.props.name }}
        />
      );
    }

    return this.props.children;
  }
}
