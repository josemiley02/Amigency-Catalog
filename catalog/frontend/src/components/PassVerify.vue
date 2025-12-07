<template>
    <div class="check-is-samy">
        <form @submit.prevent="checkIfSamy" class="form">
            <div class="form-group">
                <label for="pass">Introduce el password</label>
                <input
                    id="password"
                    v-model="check.pass"
                    type="password"
                    placeholder="pass..."
                    required
                />
            </div>

            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
            <p v-if="successMessage" class="success">{{ successMessage }}</p>

            <button type="submit" class="tab-button">
                <span class="label">Confirmar</span>
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { verifyPassword } from '../stores/adminStore'


const check = ref({ pass: '' })
const errorMessage = ref('')
const successMessage = ref('')

const checkIfSamy = () => {
    errorMessage.value = ''
    successMessage.value = ''

    if (!check.value.pass) {
        errorMessage.value = 'Por favor completa el campo'
        return
    }

    if (verifyPassword(check.value.pass)) {
        successMessage.value = 'Acceso permitido'
    } else {
        errorMessage.value = 'Usted no es Admin, no puede subir fotos'
    }
}
</script>
