import { ref } from 'vue'

export const isSamy = ref(false)

export function verifyPassword(pass: string) {
    if (pass === '050203samantha') {
        isSamy.value = true
        return true
    }
    return false
}
