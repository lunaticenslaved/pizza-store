'use server';

export async function signIn(data: unknown) {
  console.log('SIGN IN', JSON.stringify(data));
}

export async function signUp(data: unknown) {
  console.log('SIGN UP', JSON.stringify(data));
}
