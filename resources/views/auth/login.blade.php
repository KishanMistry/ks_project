<x-guest-layout>
    <x-auth-card>
        <div class="row">
            <div class="input-field col s12">
                <h5 class="ml-4">{{ __('Login') }}</h5>
            </div>
        </div>
        <!-- Session Status -->
        <x-auth-session-status class="mb-4" :status="session('status')" />
        
        <!-- Validation Errors -->
        <x-auth-validation-errors class="mb-4" :errors="$errors" />

        <form  class="login-form" method="POST" action="{{ route('login') }}">
            @csrf

            <!-- Email Address -->
            <div>
                <div class="row margin">
                    <div class="input-field col s12">
                        <i class="material-icons prefix pt-2">person_outline</i>
                        <x-label for="email" :value="__('E-Mail Address')" />
                        <x-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" autofocus />
                    </div>
                </div>                
            </div>

            <!-- Password -->
            <div class="row margin">
                <div class="input-field col s12">
                    <i class="material-icons prefix pt-2">lock_outline</i>                    
                    <x-input id="password" class="block mt-1 w-full" type="password" name="password" autocomplete="current-password" />
                    <x-label for="password" :value="__('Password')" />                    
                </div>
            </div>           
            <!-- Remember Me -->
            <div class="col s12 m12 l12 ml-2 mt-1">
                <p>
                    <label>
                        <input type="checkbox" id="remember_me"  name="remember" {{ old('remember') ? 'checked' : '' }} class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        <span>{{ __('Remember me') }}</span>
                    </label>
                </p>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <x-button class="btn waves-effect waves-light border-round gradient-45deg-purple-deep-orange col s12">
                        {{ __('Log in') }}
                    </x-button>
                </div>
            </div> 
            <div class="row">
                <div class="input-field col s6 m6 l6">
                    <p class="margin medium-small">
                        <a href="{{ route('register') }}">{{ __('Register') }}</a>
                    </p>
                </div>
                <div class="input-field col s6 m6 l6">
                    <p class="margin right-align medium-small">
                        @if (Route::has('password.request'))
                            <a href="{{ route('password.request') }}">
                                {{ __('Forgot Your Password?') }}
                            </a>
                        @endif                                
                </div>
            </div>               
        </form>
    </x-auth-card>
</x-guest-layout>
