"use client"
import SettingsForm from '@/components/SettingsForm';
import { useGetAuthUserQuery, useUpdateManagerSettingsMutation } from '@/state/api'

const ManagerSettings = () => {
    const {data: authUser,isLoading} = useGetAuthUserQuery();

    if(isLoading) return <>Loading...</>;
    const [updateManager] = useUpdateManagerSettingsMutation();

    const initilData = {
      name: authUser?.userInfo.name,
      email: authUser?.userInfo.email,
      phoneNumber: authUser?.userInfo.phoneNumber
    }

    const handleSubmit = async (data: typeof initilData) => {
      await updateManager({
        cognitoId: authUser?.cognitoInfo?.userId,
        ...data,
      })
    }
  return (
    <SettingsForm
      initialData={initilData}
      onSubmit={handleSubmit}
      userType='manager'
    />
  )
}

export default ManagerSettings