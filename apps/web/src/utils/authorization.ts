import {
  abilities,
  ActionsType,
  DBTablesType,
  parseSubjectResource,
  UserRoleType,
} from "@libs/authorization";

export const hasPermission = ({
  userId,
  userRole,
  action,
  subject,
  subjectResource,
}: {
  userRole: UserRoleType | null;
  userId: string | null;
  action: ActionsType;
  subject: DBTablesType;
  subjectResource?: object;
}) => {
  return abilities({
    userId: userId ?? "",
    userRole,
  }).can(action, parseSubjectResource({ subject, subjectResource }));
};
