import { BLOCKS } from "../helpers";
import { SandboxContainer } from "../SandboxContainer";

export const BlocksDemo = () => {
  return (
    <div className="@container grid gap-4 p-4">
      {BLOCKS.map(({ name, descriptionI18nKey, DemoComponent }) => (
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
