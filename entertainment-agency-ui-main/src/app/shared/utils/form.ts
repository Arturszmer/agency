export const markFormGroupToched = (formGroup) => {
  (Object as any).values(formGroup.controls).forEach(control => {
    control.markAsTouched();
    if (control.controls) {
      markFormGroupToched(control);
    }
  })
}
