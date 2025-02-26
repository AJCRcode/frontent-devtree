import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileForm, User } from "../types";
import { updateImage, updateProfile } from "../api/DevTreeAPI";
import { toast } from "sonner";

export default function ProfileView() {
  const queryClient = useQueryClient();
  const data: User = queryClient.getQueryData(["user"])!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      handle: data.handle,
      description: data.description,
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: updateImage,
    onError: (error: Error) => {
      console.log(error.message);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], (old: User) => {
        return { ...old, image: data };
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files ? uploadImageMutation.mutate(e.target.files[0]) : null;
  };

  const handleUsertProfileForm = (formdata: ProfileForm) => {
    const user: User = queryClient.getQueryData(["user"])!;
    user.handle = formdata.handle;
    user.description = formdata.description;
    updateProfileMutation.mutate(user);
  };

  return (
    <form
      className="bg-white p-10 rounded-lg space-y-5"
      onSubmit={handleSubmit(handleUsertProfileForm)}
    >
      <legend className="text-2xl text-slate-800 text-center">
        Editar Información
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Handle:</label>
        <input
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="handle o Nombre de Usuario"
          {...register("handle", {
            required: "El handle es obligatorio",
          })}
        />
        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Descripción:</label>
        <textarea
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Tu Descripción"
          {...register("description", {
            required: "La descripción es obligatoria",
          })}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="image">Imagen:</label>
        <input
          id="image"
          type="file"
          name="im"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Guardar Cambios"
      />
    </form>
  );
}
