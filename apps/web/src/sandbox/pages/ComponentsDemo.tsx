import { COMPONENTS } from "../helpers";
import { SandboxContainer } from "../SandboxContainer";

export const ComponentsDemo = () => {
  return (
    <div className="@container grid flex-1 gap-4 p-4">
      {COMPONENTS.map(({ name, descriptionI18nKey, DemoComponent }) => (
        <SandboxContainer
          key={name}
          name={name}
          descriptionI18nKey={descriptionI18nKey}>
          <DemoComponent />
        </SandboxContainer>
      ))}
    </div>
  );
};
