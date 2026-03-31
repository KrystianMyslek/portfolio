<script setup lang="ts">
import axios from "axios";
import { Form, Field, ErrorMessage } from "vee-validate";
import { ref } from "vue";
import * as yup from "yup";

const response_message = ref();

const schema = yup.object({
	email: yup.string().required("Email jest wymagany").email("Błędny format email"),
	name: yup.string().required("Imię jest wymagane").min(3, "Imię: min. 3 znaki"),
	message: yup.string().required("Wiadomość jest wymagana").min(4, "Treść wiadomości: min. 4 znaki"),
});

const onSubmit = async (values: any) => {
  try {
    await axios.post('server/message.php', values);

	response_message.value.style.display = "block";
	setTimeout(() => {
		response_message.value.style.display = "none";
	}, 3000);
  } catch (error) {
    console.error('Błąd:', error);
  }
}

</script>
<template>
	<div class="text-center">
		<p class="contact_text">Napisz do mnie na adres email:</p>
		<p
			class="tracking-widest xl:text-2xl py-4 cursor-pointer"
			onclick="navigator.clipboard.writeText(`krystian.myslek@gmail.com`)"
		>
			<span class="hover-underline-animation"> krystian.myslek@gmail.com </span>
		</p>
		<p class="contact_text">lub zostaw wiadomość tutaj :)</p>
	</div>

	<Form :validation-schema="schema" @submit="onSubmit">
		<div class="name mt-2">
			<label class="block text-sm/6 font-medium text-white">Imię</label>
			<Field 
				name="name" 
				type="text" 
				class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-white/10 sm:text-sm/6" 
				placeholder="Imię"
			/>
			<ErrorMessage name="name" class="text-center text-red-600" />
		</div>
		<div class="email mt-2">
			 <label class="block text-sm/6 font-medium text-white">Adres email</label>
			<Field 
				name="email" 
				type="email" 
				class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-white/10 sm:text-sm/6" 
				placeholder="Email"
			/>
			<ErrorMessage name="email" class="text-center text-red-600" />
		</div>
		<div class="message mt-2">
			<label class="block text-sm/6 font-medium text-white">Treść</label>
			<Field 
				name="message" 
				as="textarea" 
				class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-white/10 sm:text-sm/6" 
				placeholder="Treść wiaomości..."
			/>
			<ErrorMessage name="message" class="text-center text-red-600" />
		</div>
		<div ref="response_message" class="response pt-4 text-center text-green-600" style="display: none">
			Wiadomość została wysłana !
		</div>
		<div class="submit">
			<button
				type="submit"
				class="submit-btn mt-4 rounded-md border hover:bg-white/10 shadow-xs px-4 py-2.5 cursor-pointer"
			>
				Zostaw wiadomość
			</button>
		</div>
	</form>
</template>
