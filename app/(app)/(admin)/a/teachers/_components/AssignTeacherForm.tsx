"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  AssignTeacherFormSchema,
  AssignTeacherFormSchemaType,
} from "@/lib/zodSchema";
import { toast } from "sonner";
import api from "@/lib/api";
import {
  IconAlertSquareRounded,
  IconBook,
  IconBuilding,
  IconClipboardHeart,
  IconMapPin2,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RequiredAsterisk } from "@/components/RequiredAsterisk";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import * as RPNInput from "react-phone-number-input";
import {
  CountrySelect,
  FlagComponent,
  PhoneInput,
} from "@/components/PhoneNumberInput";
import DateSelector from "@/components/DateSelector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allClasses, genders, relationships, sections } from "@/constant";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { formatWord } from "@/lib/utils";
import { useAuth, User } from "@/store/useAuth";
import { UserProfilePicture } from "@/components/UserProfilePicture";
import { Class } from "../../classes/page";
import { Subject } from "../../subjects/page";

interface Props {
  teachers: User[] | undefined;
  classes: Class[] | undefined;
  subjects: Subject[] | undefined;
}

export const AssignTeacherForm = ({ teachers, classes, subjects }: Props) => {
  const router = useRouter();
  const { user } = useAuth();
  const [pending, startTransition] = useTransition();

  const form = useForm<AssignTeacherFormSchemaType>({
    resolver: zodResolver(AssignTeacherFormSchema),
    defaultValues: {
      teacher: "",
      type: "CLASS",
      class: "",
      subject: "",
    },
  });

  const type = form.watch("type");

  function onSubmit(values: AssignTeacherFormSchemaType) {
    startTransition(async () => {
      try {
        const res = await api.post(
          `/schools/${user?.school?.schoolID}/assign-teachers`,
          values
        );
        toast.success(res.data.message);
        form.reset();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assignment Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"CLASS"}>
                    <IconUsers />
                    Class Teacher
                  </SelectItem>
                  <SelectItem value={"SUBJECT"}>
                    <IconBook />
                    Subject Teacher
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teacher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Teacher</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="text-left">
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {teachers?.map((teacher) => (
                    <SelectItem value={teacher?.id!} key={teacher?.id}>
                      <span className="flex items-center gap-2">
                        <UserProfilePicture
                          src={teacher?.image}
                          alt={`${teacher?.firstName}'s picture`}
                          size="sm"
                        />
                        <span>
                          <span className="block font-medium">
                            {teacher?.firstName} {teacher?.lastName}
                          </span>
                          <span className="mt-0.5 block text-xs text-muted-foreground">
                            {teacher?.email}
                          </span>
                        </span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {type === "CLASS" ? (
          <FormField
            control={form.control}
            name="class"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Class</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {classes?.map((c) => (
                      <SelectItem value={c.id} key={c.id}>
                        {c.level}
                        {c.section}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Subject</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subjects?.map((subject) => (
                      <SelectItem value={subject.id} key={subject.id}>
                        {subject.name} ({subject.department})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="flex items-center justify-end gap-2">
          <Button
            onClick={() => router.back()}
            type="button"
            variant="secondary"
            disabled={pending}
          >
            Cancel
          </Button>
          <Button disabled={pending} type="submit">
            {pending ? <Loader text="Assigning..." /> : "Assign Teacher"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
