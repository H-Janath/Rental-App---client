"use client"
import SettingsForm from '@/components/SettingsForm';
import { useGetAuthUserQuery, useUpdateTenantSettingsMutation } from '@/state/api'

const TenantSettings = () => {
    const {data: authUser,isLoading} = useGetAuthUserQuery();
    console.log("auth",authUser)
    if(isLoading) return <>Loading...</>;
    const [updateTenant] = useUpdateTenantSettingsMutation();

    const initilData = {
      name: authUser?.userInfo.name,
      email: authUser?.userInfo.email,
      phoneNumber: authUser?.userInfo.phoneNumber
    }

    const handleSubmit = async (data: typeof initilData) => {
      await updateTenant({
        cognitoId: authUser?.cognitoInfo?.userId,
        ...data,
      })
    }
  return (
    <SettingsForm
      initialData={initilData}
      onSubmit={handleSubmit}
      userType='tenant'
    />
  )
}

export default TenantSettings