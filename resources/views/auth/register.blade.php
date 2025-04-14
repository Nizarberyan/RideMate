<form method="POST" action="{{ route('register') }}">
    @csrf
    <input type="text" name="name" placeholder="Name" required>
    <input type="email" name="email" placeholder="Email" required>
    <input type="password" name="password" placeholder="Password" required>
    <input type="password" name="password_confirmation" placeholder="Confirm Password" required>
    <select name="user_type">
        <option value="driver">Driver</option>
        <option value="passenger">Passenger</option>
    </select>
    <button type="submit">Register</button>
</form>
