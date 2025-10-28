"use client";
import { PageHeader } from "@/components/PageHeader";
import { useAuth } from "@/store/useAuth";
import React, { useEffect, useState } from "react";
import { EditProfileForm } from "./_components/EditProfileForm";
import { configService } from "@/lib/configs";
import { toast } from "sonner";
import { Loader } from "@/components/Loader";

const page = () => {
  const { user } = useAuth();

  const [states, setStates] = useState<any>([]);
  const [countries, setCountries] = useState<any>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!user?.schoolId) return;

      try {
        const [states, countries] = await Promise.all([
          configService.getCategory("STATE"),
          configService.getCategory("COUNTRY"),
        ]);

        setStates(states);
        setCountries(countries);
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [user]);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit profile"
        description="Manage your personal information and account settings"
      />
      <EditProfileForm
        states={states.items}
        countries={countries.items}
        user={user}
      />
    </div>
  );
};

export default page;
