"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
import { useLogin, useRegister } from "../hooks/use-auth";
import { LoginFormData, loginSchema } from "../types/login-schema";
import Link from "next/link";

const LoginForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const loginMutation = useLogin();

  const onSubmit = (values: LoginFormData) => {
    loginMutation.mutate({
      email: values.email,
      password: values.password,
    });
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome Back</CardTitle>
          <CardDescription>Login with your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder="m@example.com"
                />
                <FieldError>{form.formState.errors.email?.message}</FieldError>
              </Field>
              <Field>
                <Field>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      {...form.register("password")}
                      placeholder="*****"
                    />
                    <FieldError>
                      {form.formState.errors.password?.message}
                    </FieldError>
                  </Field>
                </Field>
              </Field>
              <Field>
                <Button type="submit" disabled={loginMutation.isPending}>
                  {loginMutation.isPending ? "Login..." : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/register">Register</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
