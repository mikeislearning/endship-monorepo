import {
  AbilityBuilder,
  subject as caslSubject,
  createMongoAbility,
  MongoAbility,
} from "@casl/ability";

import { Database } from "@libs/schemas";

export type UserRoleType = "SUPER_ADMIN" | "ADMIN" | "USER";

type UserType = { id: string };

export type ActionsType = "create" | "read" | "list" | "update" | "delete";
export type DBTablesType = keyof Database["public"]["Tables"];
type SubjectsType = UserType;

type AppAbilityType = MongoAbility<[ActionsType, SubjectsType | DBTablesType]>;
type RulesType = AppAbilityType["rules"];

const allActions: ActionsType[] = [
  "create",
  "read",
  "list",
  "update",
  "delete",
];

export type AbilityRequestType = {
  userId: string;
  userRole?: UserRoleType | null;
};

// ---------------------- //

export const getUserRules = ({
  userId,
  userRole,
}: AbilityRequestType): RulesType => {
  const { can, cannot, rules } = new AbilityBuilder<AppAbilityType>(
    createMongoAbility,
  );

  switch (userRole) {
    case "SUPER_ADMIN":
      can(allActions, "admins");
      can(allActions, "users");

      break;

    case "ADMIN":
      can(["read", "list"], "admins");
      can("update", "admins", { id: userId });

      can(["create", "read", "list", "update", "delete"], "users");

      break;

    case "USER":
      can("read", "admins");

      can(["read", "list"], "users");
      can(["update", "delete"], "users", { id: userId });

      break;

    default:
      allActions.forEach(action => {
        cannot(action, "admins");
        cannot(action, "users");
      });
  }

  return rules;
};

export const abilities = ({ userId, userRole }: AbilityRequestType) => {
  return createMongoAbility<[ActionsType, SubjectsType | DBTablesType]>(
    getUserRules({ userId, userRole }),
  );
};

export const parseSubjectResource = ({
  subject,
  subjectResource,
}: {
  subject: DBTablesType;
  subjectResource?: object;
}) => {
  return (subjectResource ? caslSubject(subject, subjectResource) : subject) as
    SubjectsType | DBTablesType;
};
