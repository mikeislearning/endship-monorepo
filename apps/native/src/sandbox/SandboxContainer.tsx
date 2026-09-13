import { Component, ReactNode } from "react";
import { t } from "i18next";

import { AnBox } from "@/components/AnBox";
import { AnText } from "@/components/AnText/AnText";
import { I18nKeyType } from "@/i18n";
import { appLogger } from "@/utils/logger";

type SandboxContainerPropsType = {
  titleI18nKey: I18nKeyType;
  descriptionI18nKey?: I18nKeyType;
  children?: ReactNode;
};

export const SandboxContainer = ({
  titleI18nKey,
  descriptionI18nKey,
  children,
}: SandboxContainerPropsType) => {
  return (
    <ComponentErrorBoundary name={t(titleI18nKey)}>
      <AnBox className="border-border overflow-hidden rounded-xl border">
        <AnBox className="border-border border-b px-4 py-3">
          <AnText variant="lgMedium" i18nKey={titleI18nKey} />
          {descriptionI18nKey && (
            <AnText
              variant="sm"
              className="text-muted-foreground mt-0.5"
              i18nKey={descriptionI18nKey}
            />
          )}
        </AnBox>
        <AnBox className="p-4">{children}</AnBox>
      </AnBox>
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
        <AnText
          className="p-4 text-red-500"
          i18nKey="sandbox:components.errorMessage"
          i18nOptions={{ name: this.props.name }}
        />
      );
    }

    return this.props.children;
  }
}
