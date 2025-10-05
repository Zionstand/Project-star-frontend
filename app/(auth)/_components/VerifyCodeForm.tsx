"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useTransition } from "react";
import {
  IconProgressCheck,
  IconRefreshDot,
  IconShield,
} from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { VerifyCodeSchema, VerifyCodeSchemaType } from "@/lib/zodSchema";
import api from "@/lib/api";
import { Loader } from "@/components/Loader";
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { OTPInput, SlotProps } from "input-otp";

export function VerifyCodeForm() {
  const router = useRouter();
  const setUser = useAuth((s) => s.setUser);

  const [pending, startTransition] = useTransition();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  const form = useForm<VerifyCodeSchemaType>({
    resolver: zodResolver(VerifyCodeSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: VerifyCodeSchemaType) {
    startTransition(async () => {
      try {
        const res = await api.post("/auth/verifyCode", data);
        setUser(res.data.user);
        toast.success(res.data.message);
        router.replace(`/a/dashboard`);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    });
  }

  return (
    <Card className="bg-white md:min-w-md">
      <CardContent className="space-y-10 py-6">
        <div className="space-y-3 text-center">
          <div
            className={cn(
              "rounded-full p-4 bg-secondary text-primary mx-auto inline-flex"
            )}
          >
            <IconShield className="size-8" />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-2xl md:text-3xl">Verify Code</h3>
            <p className="text-sm text-muted-foreground">
              We've sent a 6-digit verification code to{" "}
              <span className="font-medium">js***@jd.com</span>
            </p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-center w-full block">
                    Enter code
                  </FormLabel>
                  <FormControl>
                    <OTPInput
                      {...field}
                      containerClassName="flex items-center justify-center gap-3 has-disabled:opacity-50"
                      maxLength={6}
                      render={({ slots }) => (
                        <div className="flex gap-2">
                          {slots.map((slot, idx) => (
                            <Slot key={idx} {...slot} />
                          ))}
                        </div>
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? (
                <Loader text="Verifying..." />
              ) : (
                <>
                  <IconProgressCheck />
                  Verify Code
                </>
              )}
            </Button>
            <Separator />
            <div className="space-y-2 flex flex-col items-center justify-center">
              <p className="text-center text-sm text-muted-foreground">
                Didn't receive the code?
              </p>
              <Button className="w-full" variant={"outline"}>
                <IconRefreshDot />
                Resend code
              </Button>
              <p className="text-sm text-muted-foreground">Available in 1:23</p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "border-input bg-muted text-foreground flex size-14 items-center justify-center rounded-md border font-medium shadow-xs transition-[color,box-shadow]",
        { "border-ring ring-ring/50 z-10 ring-[1px]": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
