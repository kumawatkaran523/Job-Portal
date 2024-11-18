import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'
import { setLoading, setUser } from '/redux/authSlice';
import { toast } from 'sonner'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EditIcon from '@mui/icons-material/Edit';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const [profileImage, setProfileImage] = useState(user?.profileImage || null);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        if (user) {
            setValue('fullname', user.fullname);
            setValue('email', user.email);
            setValue('phoneNumber', user.phoneNumber);
            setValue('bio', user.bio);
            setValue('skills', user.skills);
        }
    }, [user, setValue]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // console.log(file);
        if (file) {
            setProfileImage(URL.createObjectURL(file));
        }
    };

    const Submit = async (data) => {
        try {
            console.log("Form Data:", data);
    
            const formData = new FormData();
            formData.append('fullname', data.fullname);
            formData.append('email', data.email);
            formData.append('phoneNumber', data.phoneNumber);
            formData.append('bio', data.bio);
            formData.append('skills', data.skills);
    
            // Append profile photo and resume if available
            if (data.profilePhoto && data.profilePhoto[0]) {
                formData.append('profilePhoto', data.profilePhoto[0]);
            }
    
            if (data.resume && data.resume[0]) {
                formData.append('resume', data.resume[0]);
            }
    
            dispatch(setLoading(true));
    
            const response = await axios.put('http://localhost:8000/app/v1/user/profile/update', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
    
            if (response.status === 200) {
                toast.success("Profile updated successfully");
                dispatch(setUser(response.data)); 
                setOpen(false);
            } else {
                throw new Error('Unexpected response status');
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error updating profile");
        } finally {
            dispatch(setLoading(false));
        }
    };
    

    return (
        <>
            <Dialog open={open} onOpenChange={() => setOpen(false)}>
                <DialogContent className="lg:max-w-[800px] font-monosans">
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(Submit)}>
                        <div className='flex flex-col space-y-2 items-start'>

                            <Avatar className="h-40 w-40 rounded-full border-[1px]">
                                <AvatarImage src={profileImage || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
                            </Avatar>

                            <label className="flex items-center space-x-1 text-sm cursor-pointer border-[1px] px-5 border-black rounded-md py-1">
                                <Input
                                    id="profilePhoto"
                                    type="file"
                                    className='hidden'
                                    accept="image/*"
                                    {...register("profilePhoto")}
                                    onChange={handleFileChange}
                                />
                                <EditIcon className="text-gray-500" />
                                <span>Edit Profile Pic</span>
                            </label>
                        </div>
                        <div className="grid gap-4 py-4 w-full">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="fullname" className="text-right">
                                    FullName<span className='text-red-500'> *</span>
                                </Label>
                                <Input
                                    id="fullname"
                                    className="col-span-3"
                                    value={user?.fullname}
                                    {...register("fullname", { required: "FullName is required" })}
                                />
                            </div>
                            {errors.fullname && <span className='text-red-500 text-xs m-2'>{errors.fullname.message}</span>}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Email Address<span className='text-red-500'> *</span>
                                </Label>
                                <Input
                                    id="email"
                                    className="col-span-3"
                                    value={user?.email}
                                    {...register("email", { required: "Email Address is required" })}
                                />
                            </div>
                            {errors.email && <span className='text-red-500 text-xs m-2'>{errors.email.message}</span>}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phoneNumber" className="text-right">
                                    Phone Number<span className='text-red-500'> *</span>
                                </Label>
                                <Input
                                    id="phoneNumber"
                                    className="col-span-3"
                                    value={user?.phoneNumber}
                                    {...register("phoneNumber", { required: "Phone number is required" })}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="bio" className="text-right">
                                    Bio<span className='text-red-500'> *</span>
                                </Label>
                                <Textarea placeholder="Tell us something about yourself..." className="col-span-3 w-full"
                                    {...register("bio", { required: "Bio is required" })}
                                    value={user?.bio}
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="skills" className="text-right">
                                    Skills<span className='text-red-500'> *</span>
                                </Label>
                                <Input
                                    id="skills"
                                    className="col-span-3"
                                    {...register("skills", { required: "Please add your skills" })}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="resume" className="text-right">Resume<span className='text-red-500'> *</span></Label>
                                <Input
                                    id="resume"
                                    name="resume"
                                    type="file"
                                    accept="application/pdf"
                                    className="col-span-3"
                                    {...register("resume", { required: "Add your resume" })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog >
        </>
    );
}

export default UpdateProfileDialog;
