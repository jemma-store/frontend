import { useState, useEffect } from 'react';
import {
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Card,
  CardContent,
  Button,
} from '@/components/ui';
import { useUserStore } from '@/store/useUserStore';
import { updateUser } from '@/services/userService';
import { useAuthStore } from '@/store/useAuthStore';
import { useWindowWidth } from '@/lib/hooks/useWindowWidth';

export const UserData = () => {
  const user = useUserStore((state) => state.currentUser);
  const setUser = useUserStore((state) => state.setUser);
  const token = useAuthStore((state) => state.accessToken);

  const [editMain, setEditMain] = useState(false);
  const [editAdditional, setEditAdditional] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {isMobile, isTablet, isDesktop} = useWindowWidth()

  // const isEditingNow = isTablet ? (editMain || editAdditional) : editAdditional;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    gender: '',
    birthdate: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        email: user.email || '',
        gender: user.gender || '',
        birthdate: user.birthdate || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const handleEditToggle = (section : string) => {
    if(isTablet) {
      setEditMain(true);
      setEditAdditional(true);
    }
    else {
      if(section === 'main') {  
        setEditMain(true)
    }
    if(section === 'additional') {
      setEditAdditional(true)
    }
    };
  }

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const updatedUser = await updateUser(formData, token);
      setUser(updatedUser);
      setEditMain(false);
      setEditAdditional(false);
    } catch (error) {
      console.error('Помилка при оновленні:', error);
    } finally {
      setIsLoading(false);
    }
  };

const handleCancelMain = () => {
  if (user) {
    setFormData((prev) => ({
      ...prev,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phone: user.phone || '',
      email: user.email || '', 
    }));
  }
  setEditMain(false);
};

  if (!user) return null;

  return (
     <>
      <div className="leading-[130%] md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 lg:grid-cols-[1fr_0.5fr_1fr] lg:pt-25 lg:pb-20 ">
        <Card>
          {isMobile && 
          (
            <h3 className='text-[20px] leading-[130%] text-center text-[#5B242A] pt-8'>Особисті дані</h3>
          )}
          <CardContent className="flex flex-col gap-6 lg:gap-9 pt-4 h-full px-4 md:px-0 "> 
            <div className="flex flex-col text-[16px] gap-4.5 md:gap-8">
              <h4 className="text-[#1D110A] font-normal text-[20px] pt-4">Основні дані</h4>
              <div className='flex flex-col gap-4 pl-3 text-[16px] font-normal md:pl-0'>
                <Label className="opacity-70">Ім'я</Label>
                  <Input
                    name="firstName"
                    readOnly={!editMain}
                    value={formData.firstName}
                    onChange={handleChange}
                    autoComplete='given-name'
                    // className={!editMain ? "bg-gray-50 cursor-default" : ""}
                    className='md:pl-3 lg:p-0'
                  />
              </div>

              {!isDesktop ? (
              <div className="flex flex-col gap-4 pl-3 text-[16px] font-normal md:pl-0">
                  <Label className="opacity-70">Прізвище</Label>
                    <Input
                      name="lastName"
                      readOnly={!editMain}
                      value={formData.lastName}
                      onChange={handleChange}
                      autoComplete='family-name'
                      // className={!editMain ? "bg-gray-50 cursor-default" : ""}
                      className='md:pl-3 lg:p-0'
                    />
              </div>
              ) : null}
              
              <div className="flex flex-col gap-4 pl-3 text-[16px] font-normal md:pl-0">
                  <Label className="opacity-70">Номер телефону</Label>
                    <Input
                      name="phone"
                      readOnly={!editMain}
                      value={formData.phone}
                      onChange={handleChange}
                      type='tel'
                      autoComplete='tel'
                      // className={!editMain ? "bg-gray-50 cursor-default" : ""}
                      className='md:pl-3 lg:p-0'
                    />
              </div>
              <div className="flex flex-col gap-4 text-[16px] font-normal pl-3  md:pl-0 md:w-70">
                <Label className="opacity-70">Електронна пошта</Label>
                  <Input
                    name="email"
                    type="email"
                    readOnly={!editMain}
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete='email'
                    // className={!editMain ? "bg-gray-50 cursor-default" : ""}
                    className='font-normal md:pl-3 lg:p-0' 
                  />
              </div>
            </div>

          {!isTablet && (
            <>
            {!editMain ? (
                <Button variant="outline" className="w-full font-normal text-[16px] lg:w-5/10" onClick={() => handleEditToggle("main")}>
                  Редагувати
                </Button>
              ) : (
                <>
                  <Button variant="ghost" className="flex-1" onClick={handleCancelMain}>
                    Скасувати
                  </Button>
                  <Button className="flex-1" onClick={handleSave} disabled={isLoading}>
                    {isLoading ? 'Збереження...' : 'Зберегти'}
                  </Button>
                </>
              )}
            </>
          )}
          </CardContent>
        </Card>

          {isDesktop ? (
            <div className="flex flex-col pt-18 gap-4.5">
                  <Label className="opacity-70">Прізвище</Label>
                    <Input
                      name="lastName"
                      readOnly={!editMain}
                      value={formData.lastName}
                      onChange={handleChange}
                      autoComplete='family-name'
                      // className={!editMain ? "bg-gray-50 cursor-default" : ""}
                      className=''
                    />
              </div>
          ) : (
            null
          )}

        <Card className="flex-1 min-w-[350px] bg-main/10 leading-[130%]">
          <CardContent className="flex flex-col justify-between h-full p-4">
            <div className="flex flex-col pt-4 md:gap-8">
              <h4 className="text-black font-normal text-[20px]">Додаткові дані</h4>

              <div className="flex flex-col gap-6 md:gap-8 pt-4 md:pt-0 text-[16px]">
                <div className="flex flex-col gap-4 pl-3 md:pl-0">
                  <Label className="opacity-70 ">Стать</Label>
                  {!editAdditional ? (
                    <div className='font-normal'>
                    {/* <div className="h-10 flex items-center px-3  rounded-md border text-sm capitalize"> */}
                      <span className='md:pl-3'>{formData.gender || 'Не вказано'}</span>
                    </div>
                  ) : (
                    <RadioGroup
                      value={formData.gender}
                      className="flex gap-6 h-10 items-center font-medium"
                      onValueChange={handleGenderChange}
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female" className="cursor-pointer">Жіноча</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male" className="cursor-pointer">Чоловіча</Label>
                      </div>
                    </RadioGroup>
                  )}
                </div>

                <div className="flex flex-col gap-4 pl-3 font-[16px] leading-[130%] md:pl-0">
                  <Label className="opacity-70">День народження</Label>
                  {!editAdditional ? (
                    <div className='font-medium'>
                      {/* <div className="h-10 flex items-center px-3 bg-gray-50 rounded-md border text-sm"> */}
                     <span className='md:pl-3'>{formData.birthdate || '-'}</span> 
                    </div>
                  ) : (
                    <Input
                      name="birthdate"
                      type="date"
                      value={formData.birthdate}
                      onChange={handleChange}
                      className='font-medium'
                    />
                  )}
                </div>
                <div className="hidden md:hidden lg:pt-23.5 lg:block">
                {!editAdditional ? (
                  <Button variant="outline" className="w-full text-[16px] font-medium lg:w-5/10" onClick={() => handleEditToggle("additional")}>
                    Редагувати
                  </Button>
                    ) : (
                      <>
                        <Button variant="ghost" className="flex-1" onClick={() => setEditAdditional(false)}>
                          Скасувати
                        </Button>
                        <Button className="flex-1" onClick={handleSave} disabled={isLoading}>
                          {isLoading ? 'Збереження...' : 'Зберегти'}
                        </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex mt-4 md:mt-21 pb-16 md:pb-0 container lg:hidden">
        {!(isTablet ? (editMain || editAdditional) : editAdditional) ? (
          <Button
            variant="outline"
            className="w-full md:w-3/5 text-[16px] font-medium"
            onClick={() => handleEditToggle(isTablet ? "all" : "additional")}
          >
            Редагувати
          </Button>
          ) : (
        <div className="flex gap-4 w-full md:w-2/5">
          <Button 
            variant="ghost" 
            className="flex-1" 
            onClick={() => {
              if (isTablet) {
                handleCancelMain(); 
                setEditAdditional(false);
              } else {
                setEditAdditional(false);
              }
            }}
          >
            Скасувати
          </Button>
          <Button 
            className="flex-1" 
            onClick={handleSave} 
            disabled={isLoading}
          >
          {isLoading ? 'Збереження...' : 'Зберегти'}
          </Button>
        </div>
      )}
      </div>
    </>
  );
}