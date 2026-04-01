<script setup lang="ts">
import axios from "axios";
import { Form, Field, ErrorMessage } from "vee-validate";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import * as yup from "yup";

const { t } = useI18n();

const response_message = ref();

const schema = computed(() => {
  return yup.object({
	email: yup.string().required(t("validation.email_required")).email(t("validation.email_invalid")),
	name: yup.string().required(t("validation.name_required")).min(3, t("validation.name_too_short", { min: 3 })),
	message: yup.string().required(t("validation.message_required")).min(4, t("validation.message_too_short", { min: 4 })),
  })
})

const onSubmit = async (values: any, { resetForm }: any) => {
  try {
    await axios.post('server/message.php', values);

	response_message.value.style.display = "block";
	setTimeout(() => {
		response_message.value.style.display = "none";
	}, 3000);

	resetForm();
  } catch (error) {
    console.error('Błąd:', error);
  }
}

</script>
<template>
	<div class="text-center">
		<p class="contact_text">{{ $t("contact.text") }}</p>
		<p
			class="tracking-widest xl:text-2xl py-4 cursor-pointer"
			onclick="navigator.clipboard.writeText(`krystian.myslek@gmail.com`)"
		>
			<span class="hover-underline-animation"> krystian.myslek@gmail.com </span>
		</p>
		<p class="contact_text">{{ $t("contact.text2") }}</p>
	</div>

	<Form :validation-schema="schema" @submit="onSubmit">
		<div class="name mt-2">
			<label class="block text-sm/6 font-medium text-white">{{ $t('contact.name') }}</label>
			<Field 
				name="name" 
				type="text" 
				class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-white/10 sm:text-sm/6" 
				:placeholder="$t('contact.name_placeholder')"
			/>
			<ErrorMessage name="name" class="text-center text-red-600" />
		</div>
		<div class="email mt-2">
			 <label class="block text-sm/6 font-medium text-white">{{ $t('contact.email') }}</label>
			<Field 
				name="email" 
				type="email" 
				class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-white/10 sm:text-sm/6" 
				:placeholder="$t('contact.email_placeholder')"
			/>
			<ErrorMessage name="email" class="text-center text-red-600" />
		</div>
		<div class="message mt-2">
			<label class="block text-sm/6 font-medium text-white">{{ $t('contact.message') }}</label>
			<Field 
				name="message" 
				as="textarea" 
				class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-white/10 sm:text-sm/6" 
				:placeholder="$t('contact.message_placeholder')"
			/>
			<ErrorMessage name="message" class="text-center text-red-600" />
		</div>
		<div ref="response_message" class="response pt-4 text-center text-green-600" style="display: none">
			{{ $t('contact.response') }}
		</div>
		<div class="submit">
			<button
				type="submit"
				class="submit-btn mt-4 rounded-md border hover:bg-white/10 shadow-xs px-4 py-2.5 cursor-pointer"
			>
				{{ $t('contact.send') }}
			</button>
		</div>
	</form>
</template>
