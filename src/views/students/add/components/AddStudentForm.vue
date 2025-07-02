<script setup lang="ts">
import { upload } from '@/config/cloudinary'
import { reactive, ref } from 'vue'
import { useAddStudentMutation } from '../../common/student_api'
import type { IStudentDTO } from '../../common/types'

const formData = reactive({
  first_name_en: '',
  middle_name_en: '',
  last_name_en: '',
  first_name_np: '',
  middle_name_np: '',
  last_name_np: '',
  phone_number: null as number | null,
  date_of_birth: '',
  gender: '',
  caste: '',
  ethnicity: '',
  edj: '',
  disability_status: '',
  citizenship_number: null as number | null,
  national_id_number: null as number | null,
  profile_picture: '' as File | string,
  citizenship_photo: '' as File | string,
  permanent_address: {
    province: '',
    district: '',
    local_level: '',
    ward_no: null as number | null,
    tole: '',
    house_no: '',
  },
  temporary_address: {
    province: '',
    district: '',
    local_level: '',
    ward_no: null as number | null,
    tole: '',
    house_no: '',
  },
  gurdian_details: {
    father_name: '',
    mother_name: '',
    phone_number: null as number | null,
    email: '',
    occupation: '',
  },
  previous_academic: {
    level: '',
    board_or_university: '',
    registration_no: '',
    institute: '',
    academic_docs: '' as File | string,
  },
  academic_enrollment: {
    level: '',
    faculty: '',
    program: '',
    admission_year: '',
    date_of_admission: '',
    class_roll_no: null as number | null,
    registration_no: null as number | null,
    academic_duration: '',
  },
  college_id: 2,
})

const handleFile = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target?.files

  if (files && files.length > 0) {
    formData.profile_picture = files[0]
  }
}

const handleCitizenshipFile = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files

  if (files && files.length > 0) {
    formData.citizenship_photo = files[0]
  }
}
const sameAsPermanent = ref(false)

const handleSameAddress = () => {
  if (sameAsPermanent.value) {
    formData.temporary_address = { ...formData.permanent_address }
  } else {
    formData.temporary_address = {
      province: '',
      district: '',
      local_level: '',
      ward_no: null as number | null,
      tole: '',
      house_no: '',
    }
  }
}

const handleAcademicDocs = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files

  if (files && files.length > 0) {
    formData.previous_academic.academic_docs = files[0]
  }
}
const { isPending, mutateAsync } = useAddStudentMutation()
const onSubmit = async () => {
  // const payload = new FormData()

  // for (const [key, value] of Object.entries(formData)) {
  //   if (value instanceof File) {
  //     const data = await upload({ image: value })
  //     payload.append(key, data)
  //   } else if (typeof value === 'object' && value !== null) {
  //     for (const [childKey, childValue] of Object.entries(value)) {
  //       if (childValue instanceof File) {
  //         const data = await upload({ image: childValue })
  //         payload.append(`${key}[${childKey}]`, data)
  //       } else {
  //         payload.append(`${key}[${childKey}]`, childValue)
  //       }
  //     }
  //   } else {
  //     payload.append(key, value as string)
  //   }
  // }

  // 1️⃣ Upload profile_picture if it’s a File
  let profile_picture_url = ''
  if (formData.profile_picture instanceof File) {
    const uploaded = await upload({ image: formData.profile_picture })
    profile_picture_url = uploaded // or uploaded.url if needed
  } else {
    profile_picture_url = formData.profile_picture as string
  }

  // 2️⃣ Upload citizenship_photo if it’s a File
  let citizenship_photo_url = ''
  if (formData.citizenship_photo instanceof File) {
    const uploaded = await upload({ image: formData.citizenship_photo })
    citizenship_photo_url = uploaded
  } else {
    citizenship_photo_url = formData.citizenship_photo as string
  }

  // 3️⃣ Upload academic_docs if it’s a File
  let academic_docs_url = ''
  if (formData.previous_academic.academic_docs instanceof File) {
    const uploaded = await upload({ image: formData.previous_academic.academic_docs })
    academic_docs_url = uploaded
  } else {
    academic_docs_url = formData.previous_academic.academic_docs as string
  }

  // 4️⃣ Now build IStudentDTO
  const payload = {
    ...formData,
    profile_picture: profile_picture_url,
    citizenship_photo: citizenship_photo_url,
    previous_academic: {
      ...formData.previous_academic,
      academic_docs: academic_docs_url,
    },
  }

  try {
    await mutateAsync(payload as IStudentDTO)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="form-container">
    <div class="form-title">Personal Info</div>
    <div class="input-item">
      <label for="firt_name_en">First Name (English)</label>
      <input type="text" v-model="formData.first_name_en" placeholder="" />
    </div>
    <!-- <input type="text" v-model="formData.name_np" placeholder="student name" /> -->
    <div class="input-item">
      <label for="middle_name_en">Middle Name (English)</label>
      <input type="text" v-model="formData.middle_name_en" placeholder="" />
    </div>
    <div class="input-item">
      <label for="last_name_en">Last Name (English)</label>
      <input type="text" v-model="formData.last_name_en" />
    </div>
    <div class="input-item">
      <label for="first_name_np">First Name (Nepali)</label>
      <input type="text" v-model="formData.first_name_np" />
    </div>
    <div class="input-item">
      <label for="middle_name_np">Middle Name (Nepali)</label>
      <input type="text" v-model="formData.middle_name_np" />
    </div>
    <div class="input-item">
      <label for="last_name_np">Last Name (Nepali)</label>
      <input type="text" v-model="formData.last_name_np" />
    </div>
    <div class="input-item">
      <label for="date_of_birth">Date of Birth</label>
      <input type="date" v-model="formData.date_of_birth" />
    </div>
    <div class="input-item">
      <label for="gender">Gender</label>
      <input type="text" v-model="formData.gender" />
    </div>
    <div class="input-item">
      <label for="caste">Caste</label>
      <input type="text" v-model="formData.caste" />
    </div>
    <div class="input-item">
      <label for="ethnicity">Ethnicity</label>
      <input type="text" v-model="formData.ethnicity" />
    </div>
    <div class="input-item">
      <label for="edj">EDJ</label>
      <input type="text" v-model="formData.edj" />
    </div>
    <div class="input-item">
      <label for="disability">Disability</label>
      <input type="text" v-model="formData.disability_status" />
    </div>
    <div class="input-item">
      <label for="phone">Phone</label>
      <input type="number" v-model="formData.phone_number" />
    </div>
    <div class="input-item">
      <label for="citizenship_number">Citizenship No.</label>
      <input type="text" v-model="formData.citizenship_number" />
    </div>
    <div class="input-item">
      <label for="national_id">National Id No.</label>
      <input type="text" v-model="formData.national_id_number" />
    </div>
    <div class="input-item">
      <label for="profiel">Std. Photo</label>
      <input type="file" @change="handleFile" accept="image/*" />
    </div>
    <div class="input-item">
      <label for="citizenship-photo">Std. Citizenship</label>
      <input type="file" @change="handleCitizenshipFile" accept="image/*" />
    </div>
    <div class="form-title">Permament Address</div>
    <div class="input-item">
      <label for="province">Province</label>
      <input type="text" v-model="formData.permanent_address.province" />
    </div>
    <div class="input-item">
      <label for="distict">District</label>
      <input type="text" v-model="formData.permanent_address.district" />
    </div>
    <div class="input-item">
      <label for="Local level">Municipality</label>
      <input type="text" v-model="formData.permanent_address.local_level" />
    </div>
    <div class="input-item">
      <label for="ward">Ward No.</label>
      <input type="number" v-model="formData.permanent_address.ward_no" />
    </div>
    <div class="input-item">
      <label for="tole">Tole</label>
      <input type="text" v-model="formData.permanent_address.tole" />
    </div>
    <div class="input-item">
      <label for="House No.">House No.</label>
      <input type="text" v-model="formData.permanent_address.house_no" />
    </div>
    <div class="form-title">Temporary Address</div>
    <div class="form-title">
      <input
        type="checkbox"
        id="temporary_address"
        name="same_as_permanent"
        v-model="sameAsPermanent"
        @change="handleSameAddress"
      />
      <label for="same_as_permenent"> Same as permanent</label><br />
    </div>
    <div class="input-item">
      <label for="province">Province</label>
      <input
        type="text"
        v-model="formData.temporary_address.province"
        :disabled="sameAsPermanent"
      />
    </div>
    <div class="input-item">
      <label for="district">District</label>
      <input
        type="text"
        v-model="formData.temporary_address.district"
        :disabled="sameAsPermanent"
      />
    </div>
    <div class="input-item">
      <label for="Local level">Municipality</label>
      <input
        type="text"
        v-model="formData.temporary_address.local_level"
        :disabled="sameAsPermanent"
      />
    </div>
    <div class="input-item">
      <label for="ward">Ward No.</label>
      <input
        type="number"
        v-model="formData.temporary_address.ward_no"
        :disabled="sameAsPermanent"
      />
    </div>
    <div class="input-item">
      <label for="tole">Tole</label>
      <input type="text" v-model="formData.temporary_address.tole" :disabled="sameAsPermanent" />
    </div>
    <div class="input-item">
      <label for="House No.">House No.</label>
      <input
        type="text"
        v-model="formData.temporary_address.house_no"
        :disabled="sameAsPermanent"
      />
    </div>
    <div class="form-title">Gurdian Details</div>
    <div class="input-item">
      <label for="father">Father Name</label>
      <input type="text" v-model="formData.gurdian_details.father_name" />
    </div>
    <div class="input-item">
      <label for="mother">Mother Name</label>
      <input type="text" v-model="formData.gurdian_details.mother_name" />
    </div>
    <div class="input-item">
      <label for="phone_num">Phone</label>
      <input type="number" v-model="formData.gurdian_details.phone_number" />
    </div>
    <div class="input-item">
      <label for="Gurdian email">Email</label>
      <input type="email" v-model="formData.gurdian_details.email" />
    </div>
    <div class="input-item">
      <label for="Occupation">Occupation</label>
      <input type="text" v-model="formData.gurdian_details.occupation" />
    </div>
    <div class="form-title">Previous Academic</div>
    <div class="input-itme">
      <label for="level">Level</label>
      <input type="text" v-model="formData.previous_academic.level" />
    </div>
    <div class="input-item">
      <label for="Board/University">Board/Univerisity</label>
      <input type="text" v-model="formData.previous_academic.board_or_university" />
    </div>
    <div class="input-item">
      <label for="Registration no">Registration No.</label>
      <input type="number" v-memo="formData.previous_academic.registration_no" />
    </div>
    <div class="input-item">
      <label for="institute">Institute</label>
      <input type="text" v-model="formData.previous_academic.institute" />
    </div>
    <div class="input-item">
      <label for="academic docs">Academis docs.</label>
      <input type="file" accept="application/pdf" @change="handleAcademicDocs" />
    </div>
    <div class="form-title">Enrollment</div>
    <div class="input-item">
      <label for="Admission">Batch</label>
      <input type="text" v-model="formData.academic_enrollment.admission_year" />
    </div>
    <div class="input-item">
      <label for="" level>Level</label>
      <input type="text" v-model="formData.academic_enrollment.level" />
    </div>
    <div class="input-item">
      <label for="faculty">Faculty</label>
      <input type="text" v-model="formData.academic_enrollment.faculty" />
    </div>
    <div class="input-item">
      <label for="program">Program</label>
      <input type="text" v-model="formData.academic_enrollment.program" />
    </div>
    <div class="input-item">
      <label for="date of admission">Date of Admission</label>
      <input type="date" v-model="formData.academic_enrollment.date_of_admission" />
    </div>
    <div class="input-item">
      <label for="Duration">Academic Duration</label>
      <input type="text" v-model="formData.academic_enrollment.academic_duration" />
    </div>
    <button type="submit" style="margin-top: 10px" :disabled="isPending">
      {{ isPending ? 'Loading...' : 'Submit' }}
    </button>
  </form>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari&display=swap');

.form-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}
.nepali-font {
  font-family: 'Noto Sans Devanagari', sans-serif;
}
label {
  font-weight: 600;
  color: #646464;
}

.input-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-title {
  font-size: 20px;
  font-weight: bold;
  grid-column: 1 / -1;
}
input[type='checkbox'] {
  width: 16px;
  height: 16px;
}
</style>
