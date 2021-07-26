<?php
 
namespace App\Http\Livewire;
 
use Livewire\Component;
use Hash;
use App\User;
 
class RegistrationLogin extends Component
{
    public $users, $email, $password, $name;
    public $registerForm = false;
 
    public function render()
    {
        return view('livewire.registration-login');
    }
 
    private function resetInputFields(){
        $this->name = '';
        $this->email = '';
        $this->password = '';
    }
 
    public function login()
    {
    	echo 123123;exit;
        $validatedDate = $this->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
         
        if(\Auth::attempt(array('email' => $this->email, 'password' => $this->password))){
                session()->flash('message', "You have been successfully login.");
        }else{
            session()->flash('error', 'email and password are wrong.');
        }
    }
 
    public function register()
    {
        $this->registerForm = !$this->registerForm;
    }
 
    public function registerStore()
    {
        $v = $this->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);
 
        $this->password = Hash::make($this->password); 
 
        $data = [ 'name' => $this->name, 
                  'email' => $this->email,
                  'password' => $this->password
                ];
 
        User::create($data);
 
        session()->flash('message', 'You have been successfully registered.');
 
        $this->resetInputFields();
 
    }
}