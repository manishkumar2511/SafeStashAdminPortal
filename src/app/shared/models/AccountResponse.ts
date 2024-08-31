export interface AccountResponse {
  title: string
  data: any
  message: string
  succeeded: boolean
  requiresTwoFactor: boolean
  requiresPhoneNumberConfirmed: boolean
}
