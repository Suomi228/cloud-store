"use server";

import { Query, ID } from "node-appwrite";
import { createAdminClient } from "../apwrite";
import { appwriteConfig } from "../apwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();
  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("email", [email])]
  );

  return result.total > 0 ? result.documents[0] : null;
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();
  try {
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    console.log(error, "Failed to sent OTP");
  }
};

export const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  const existingUser = await getUserByEmail(email);
  const accountId = await sendEmailOTP({ email });
  if (!accountId) throw new Error("Failed to send OTP");
  if (!existingUser) {
    const { databases } = await createAdminClient();
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        email,
        fullName,
        avatar:
          "data:image/png;base64,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",
        accountId,
      }
    );
  }
  return parseStringify({ accountId });
};

export const verifySecret = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createSession(accountId, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    console.log(error);
  }
};
