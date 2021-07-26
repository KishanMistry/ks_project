<x-guest-layout>
    <x-auth-card>
        <x-slot name="logo">
            <a href="/">
                <x-application-logo class="w-20 h-20 fill-current text-gray-500" />
            </a>
        </x-slot>
        <div class="row">
            <div class="input-field col s12">
                <h5 class="ml-4">{{ __('Register') }}</h5>
            </div>
        </div>
        <!-- Validation Errors -->
        <x-auth-validation-errors class="mb-4" :errors="$errors" />

        <form method="POST" action="{{ route('register') }}">
            @csrf

            <!-- Name -->
            <div>
                <div class="row margin">
                    <div class="input-field col s12">
                        <i class="material-icons prefix pt-2">person_outline</i>
                        <x-label for="name" :value="__('Name')" />
                        <x-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" autofocus />
                    </div>
                </div>
            </div>

            <!-- Email Address -->
            <div class="row margin">
                <div class="input-field col s12">
                    <i class="material-icons prefix pt-2">mail_outline</i>
                    <x-label for="email" :value="__('Email')" />
                    <x-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" />
                </div>
            </div>

            <!-- Password -->
            <div class="row margin">
                <div class="input-field col s12">
                    <i class="material-icons prefix pt-2">lock_outline</i>
                    <x-label for="password" :value="__('Password')" />

                    <x-input id="password" class="block mt-1 w-full"
                                type="password"
                                name="password"
                                autocomplete="new-password" />
                </div>
            </div>
            <!-- Confirm Password -->
            <div class="row margin">
                <div class="input-field col s12">
                    <i class="material-icons prefix pt-2">lock_outline</i>
                    <x-label for="password_confirmation" :value="__('Confirm Password')" />

                    <x-input id="password_confirmation" class="block mt-1 w-full"
                                type="password"
                                name="password_confirmation" />
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <button type="submit" class="btn waves-effect waves-light border-round gradient-45deg-purple-deep-orange col s12">
                        {{ __('Register') }}
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <p class="margin medium-small"><a href="{{ route('login') }}">Already have an account? Login</a></p>
                </div>
            </div>
        </form>
    </x-auth-card>
</x-guest-layout>
