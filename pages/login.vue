<template>
    <section class="bg-slate-100">
        <div class="flex flex-col gap-10 container justify-center items-center min-h-screen ">
            <NuxtLink to="/"><Icon name="streamline:food-kitchenware-chef-toque-hat-cook-gear-chef-cooking-nutrition-tools-clothes-hat-clothing-food"
                  color="black"
                  class=" text-6xl" /></NuxtLink>
            <form
                  class="bg-white w-full max-w-xl h-fit rounded-lg shadow-md shadow-slate-200 appearance-none border p-10 pt-16 before:absolute before:bg-accent before:top-0 before:left-0 before:right-0 before:h-8 before:rounded-t-lg relative">

                <h1 class=" text-2xl font-medium mb-7">Sign in to your account</h1>

                <label for="email">Your email</label>
                <input placeholder="email@example.com"
                       type="email"
                       id="email"
                       class="border block mt-2 rounded-md w-full py-2 px-4 mb-7 outline-accent"
                       v-model="emailInput">

                <label for="password">Your password</label>
                <input placeholder="•••••••••"
                       type="password"
                       id="password"
                       class="border block mt-2 rounded-md w-full py-2 px-4 mb-7 outline-accent"
                       v-model="passwordInput">

                <button @click.prevent="() => isSignUp ? signUp() : signIn()"
                        class="w-full bg-accent rounded-md py-2 mt-7 text-white">
                    {{ isSignUp ? 'Sign up' : 'Sign in' }}
                </button>

                <p class="mt-5">
                    <span v-if="isSignUp">Already have an account? </span>
                    <span v-else>Don't have an account yet? </span>
                    <button @click.prevent="isSignUp = !isSignUp"
                            class=" hover:underline cursor-pointer text-accent">
                        <span v-if="isSignUp">Sign in!</span>
                        <span v-else>Sign up!</span>
                    </button>
                </p>
                <div class="flex gap-3 items-center mt-4">
                    <div class="flex-1 h-[1px] bg-slate-200"></div>
                    <span class=" text-slate-300">OR</span>
                    <div class="flex-1 h-[1px] bg-slate-200"></div>
                </div>
                <div class="flex">
                    <button @click.prevent="signInWithDiscord"
                            class=" text-4xl mt-3 m-auto -translate-y-[-6px]">
                        <Icon name="logos:discord-icon" />
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>

<script setup>
const client = useSupabaseAuthClient();
const router = useRouter();

const emailInput = ref(null);
const passwordInput = ref(null);

const isSignUp = ref(true);

definePageMeta({
    middleware: [
        'redirect-login',
    ]
})

const signUp = async () => {
    const { data, error } = await client.auth.signUp({
        email: emailInput.value,
        password: passwordInput.value
    })

    if (error) {
        console.log(emailInput.value);
        console.log(passwordInput.value);

        console.log(error.message);
        return alert(error.message);
    }

    router.push('/');
}

const signIn =  async() => {
    const { data, error } = await client.auth.signInWithPassword({
        email: emailInput.value,
        password: passwordInput.value
    })

    if (error) {
        console.log(emailInput.value);
        console.log(passwordInput.value);

        console.log(error.message);
        return alert(error.message);
    }

    router.push('/');
}

const signInWithDiscord = async () => { 
    const { data, error } = await client.auth.signInWithOAuth({ provider: 'discord' });

    if (error) {
        console.log(error);
        return alert('Something went wrong.');
    }

    router.push('/');
}
</script>

<style lang="scss" scoped></style>