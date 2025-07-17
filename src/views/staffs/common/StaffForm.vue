<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { IStaff, IStaffDTO } from './staff_types'
import { useUserStore } from '@/pinia/authStore'

interface StaffFormProps {
  onSubmit: (data: IStaffDTO) => void
  mode?: 'edit' | 'add'
  isLoading?: boolean
  submitText?: string
  initialData?: IStaff
}

const store = useUserStore()

const props = withDefaults(defineProps<StaffFormProps>(), {
  submitText: 'Submit',
  mode: 'add',
})
const formData = reactive<IStaffDTO>({
  first_name_en: '',
  middle_name_en: '',
  last_name_en: '',
  first_name_np: '',
  middle_name_np: '',
  last_name_np: '',
  date_of_birth: '',
  gender: '',
  caste: '',
  disability_status: '',
  phone_number: null as number | null,
  citizenship_number: null as number | null,
  national_id: null as number | null,
  photo: '' as File | string,
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
  academic_info: {
    level_of_study: '',
    university: '',
    institute: '',
    registration: '',
    academic_docs: '' as File | string,
  },
  job_info: {
    position: '',
    level: '',
    job_type: '',
    department: '',
    appointed_date: '',
    working_hour: '',
    category: '',
  },
  college_id: store?.userInfo?.college_id as number,
})

const handlePhoto = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files

  if (files && files?.length > 0) {
    formData.photo = files[0]
  }
}
const handleCitizenshipPhoto = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files

  if (files && files.length > 0) {
    formData.citizenship_photo = files[0]
  }
}
const handleAcademicFile = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files

  if (files && files.length > 0) {
    formData.academic_info.academic_docs = files[0]
  }
}
const isSameAddress = ref<boolean>(false)
const handleSameAddress = () => {
  if (isSameAddress.value) {
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
watch(
  () => props.initialData,
  (newStaff) => {
    Object.assign(formData, newStaff)
  },
  {
    deep: true,
    immediate: true,
  },
)

const handleSubmit = () => {
  props.onSubmit({ ...formData })
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-container">
      <h4 style="grid-column: 1 / -1">Personal Details</h4>
      <div class="input-item">
        <label for="First Name En" class="form-level">First Name (EN)</label>
        <input type="text" v-model="formData.first_name_en" />
      </div>
      <div class="input-item">
        <label for="First Name En" class="form-level">Middle Name (EN)</label>
        <input type="text" v-model="formData.middle_name_en" />
      </div>
      <div class="input-item">
        <label for="First Name En" class="form-level">Last Name (EN)</label>
        <input type="text" v-model="formData.last_name_en" />
      </div>
      <div class="input-item">
        <label for="First Name En" class="form-level">First Name (NP)</label>
        <input type="text" v-model="formData.first_name_np" />
      </div>
      <div class="input-item">
        <label for="First Name En" class="form-level">Middle Name (NP)</label>
        <input type="text" v-model="formData.middle_name_np" />
      </div>
      <div class="input-item">
        <label for="First Name En" class="form-level">Last Name (NP)</label>
        <input type="text" v-model="formData.last_name_np" />
      </div>
      <div class="input-item">
        <label for="date of birth" class="form-level">Date of Birth</label>
        <input type="date" v-model="formData.date_of_birth" />
      </div>
      <div class="input-item">
        <label for="gender" class="form-level">Gender</label>
        <select v-model="formData.gender">
          <option :value="null" style="color: gray">--Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="input-item">
        <label for="caste" class="form-level">Caste</label>
        <input type="text" v-model="formData.caste" />
      </div>
      <div class="input-item">
        <label for="disability status" class="form-level">Disability Status</label>
        <input type="text" v-model="formData.disability_status" />
      </div>
      <div class="input-item">
        <label for="citizenship number" class="form-level">Citizenship No.</label>
        <input type="number" v-model="formData.citizenship_number" />
      </div>
      <div class="input-item">
        <label for="national id" class="form-level">National ID No.</label>
        <input type="number" v-model="formData.national_id" />
      </div>
      <div class="input-item">
        <label for="mobile number" class="form-level">Phone No.</label>
        <input type="number" v-model="formData.phone_number" />
      </div>
      <div class="input-item">
        <label for="photo" class="form-level">Photo(PP)</label>
        <input type="file" @change="handlePhoto" accept="image/*" />
      </div>
      <div class="input-item">
        <label for="citizenship photo" class="form-level">Citizenship Photo</label>
        <input type="file" @change="handleCitizenshipPhoto" accept="image/*" />
      </div>
      <h4 style="grid-column: 1 / -1">Permanent Address</h4>
      <div class="input-item">
        <label for="Province" class="form-level">Province</label>
        <input type="text" v-model="formData.permanent_address.province" />
      </div>
      <div class="input-item">
        <label for="district" class="form-level">District</label>
        <input type="text" v-model="formData.permanent_address.district" />
      </div>
      <div class="input-item">
        <label for="local leel" class="form-level">Local Level</label>
        <input type="text" v-model="formData.permanent_address.local_level" />
      </div>
      <div class="input-item">
        <label for="wardno" class="form-level">Ward No.</label>
        <input type="text" v-model="formData.permanent_address.ward_no" />
      </div>
      <div class="input-item">
        <label for="tole" class="form-level">Tole</label>
        <input type="text" v-model="formData.permanent_address.tole" />
      </div>
      <div class="input-item">
        <label for="house" class="form-level">House No.</label>
        <input type="text" v-model="formData.permanent_address.house_no" />
      </div>
      <h4 style="grid-column: 1 / -1">Temporary Address</h4>
      <div
        style="
          grid-column: 1 / -1;
          display: flex;
          gap: 5px;
          justify-content: flex-start;
          align-items: flex-start;
        "
      >
        <input
          type="checkbox"
          id="temporary_address"
          name="same_as_permanent"
          v-model="isSameAddress"
          @change="handleSameAddress"
        />
        <label for="">Same as Permanent</label>
      </div>
      <div class="input-item">
        <label for="Province" class="form-level">Province</label>
        <input type="text" v-model="formData.temporary_address.province" />
      </div>
      <div class="input-item">
        <label for="district" class="form-level">District</label>
        <input type="text" v-model="formData.temporary_address.district" />
      </div>
      <div class="input-item">
        <label for="local leel" class="form-level">Local Level</label>
        <input type="text" v-model="formData.temporary_address.local_level" />
      </div>
      <div class="input-item">
        <label for="wardno" class="form-level">Ward No.</label>
        <input type="text" v-model="formData.temporary_address.ward_no" />
      </div>
      <div class="input-item">
        <label for="tole" class="form-level">Tole</label>
        <input type="text" v-model="formData.temporary_address.tole" />
      </div>
      <div class="input-item">
        <label for="house" class="form-level">House No.</label>
        <input type="text" v-model="formData.temporary_address.house_no" />
      </div>
      <h4 style="grid-column: 1 / -1">Academic Details</h4>
      <div class="input-item">
        <label for="level of study" class="form-level">Level of Study</label>
        <input type="text" v-model="formData.academic_info.level_of_study" />
      </div>
      <div class="input-item">
        <label for="university" class="form-level">University/Board</label>
        <input type="text" v-model="formData.academic_info.university" />
      </div>
      <div class="input-item">
        <label for="Institute" class="form-level">Institute</label>
        <input type="text" v-model="formData.academic_info.institute" />
      </div>
      <div class="input-item">
        <label for="registration" class="form-level">Registration</label>
        <input type="text" v-model="formData.academic_info.registration" />
      </div>
      <div class="input-item">
        <label for="academic docs" class="form-level">Academic Docs</label>
        <input type="file" @change="handleAcademicFile" />
      </div>
      <h4 style="grid-column: 1 / -1">Job Details</h4>
      <div class="input-item">
        <label for="position" class="form-level">Position</label>
        <input type="text" v-model="formData.job_info.position" />
      </div>
      <div class="input-item">
        <label for="level" class="form-level">Level</label>
        <input type="text" v-model="formData.job_info.level" />
      </div>
      <div class="input-item">
        <label for="type" class="form-level">Type</label>
        <input type="text" v-model="formData.job_info.job_type" />
      </div>
      <div class="input-item">
        <label for="department" class="form-level">Department</label>
        <input type="text" v-model="formData.job_info.department" />
      </div>
      <div class="input-item">
        <label for="appointed date" class="form-level">Appointed Date</label>
        <input type="date" v-model="formData.job_info.appointed_date" />
      </div>
      <div class="input-item">
        <label for="working hour" class="form-level">Working Hour</label>
        <input type="text" v-model="formData.job_info.working_hour" />
      </div>
      <div class="input-item">
        <label for="category" class="form-level">Category</label>
        <!-- <input type="text" v-model="formData.job_info.category" /> -->
        <select v-model="formData.job_info.category">
          <option :value="null" style="color: gray">--Select</option>
          <option value="technical">Technical</option>
          <option value="non_technical">Non Technical</option>
        </select>
      </div>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Loading...' : `${submitText}` }}
      </button>
    </div>
  </form>
</template>

<style scoped>
input[type='checkbox'] {
  height: 16px;
  width: 16px;
}
</style>
