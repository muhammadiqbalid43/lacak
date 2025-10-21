import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { RegisterFormData } from "../types/register-schema";
import { LoginFormData } from "../types/login-schema";
import { UserRole } from "../types/auth-type";

export async function registerUser({
  fullName,
  email,
  password,
}: RegisterFormData): Promise<User> {
  let authUser: User | null = null;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    authUser = userCredential.user;

    await updateProfile(authUser, {
      displayName: fullName,
    });

    await setDoc(doc(db, "users", authUser.uid), {
      name: fullName,
      email: email,
      role: "client" as UserRole,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    });

    return authUser;
  } catch (error: any) {
    if (authUser && error.code?.startsWith("firestore/")) {
      try {
        await authUser.delete();
      } catch (cleanupError) {
        console.error("Failed to clean up auth user:", cleanupError);
      }
    }

    switch (error.code) {
      case "auth/email-already-in-use":
        throw new Error("This email is already registered");
      case "auth/weak-password":
        throw new Error("Password should be at least 6 characters");
      case "auth/invalid-email":
        throw new Error("Invalid email address");
      default:
        throw new Error("Registration failed. Please try again.");
    }
  }
}

export async function loginUser({ email, password }: LoginFormData) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    switch (error.code) {
      case "auth/invalid-email":
        throw new Error("Invalid email address");
      case "auth/user-disabled":
        throw new Error("This account has been disabled");
      case "auth/user-not-found":
      case "auth/wrong-password":
        throw new Error("Invalid email or password");
      case "auth/too-many-requests":
        throw new Error("Too many failed attempts. Please try again later");
      default:
        throw new Error("Login failed. Please try again");
    }
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error: any) {
    if (error.code === "auth/network-request-failed") {
      throw new Error("Network error. Please check your connection");
    }

    throw new Error("Logout failed. Please try again");
  }
}
