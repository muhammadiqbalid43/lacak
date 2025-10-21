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
import { RegisterFormData, registerSchema } from "../types/register-schema";
import { useRegister } from "../hooks/use-auth";
import Link from "next/link";

const RegisterForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", fullName: "" },
  });

  const registerMutation = useRegister();

  const onSubmit = (values: RegisterFormData) => {
    registerMutation.mutate({
      email: values.email,
      password: values.password,
      fullName: values.fullName,
    });
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  {...form.register("fullName")}
                  placeholder="Muhammad Iqbal"
                />
                <FieldError>
                  {form.formState.errors.fullName?.message}
                </FieldError>
              </Field>
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
                      placeholder="*******"
                    />
                    <FieldError>
                      {form.formState.errors.password?.message}
                    </FieldError>
                  </Field>
                </Field>
              </Field>
              <Field>
                <Button type="submit" disabled={registerMutation.isPending}>
                  {registerMutation.isPending
                    ? "Creating..."
                    : "Create Account"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
