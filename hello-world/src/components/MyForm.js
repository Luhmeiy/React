// styles / SCSS
import form from './MyForm.module.scss';

// React
import {useState} from 'react';

const MyForm = ({user}) => {
    const [name, setName] = useState(user ? user.name : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [bio, setBio] = useState(user ? user.bio : '');
    const [role, setRole] = useState(user ? user.role : '');

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submiting form");
        console.log(name, email, bio, role);

        setName("");
        setEmail("");
        setBio("");
    }

    return (
        <div>
            <form className={form.form} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input type="text" className={form['form-item']} name="name" placeholder="Type your name" onChange={handleName} value={name} />
                </div>

                <label>
                    <span>Email</span>
                    <input type="email" className={form['form-item']}  name="email" placeholder="Type your email" onChange={(e) => setEmail(e.target.value)}  value={email} />
                </label>

                <label>
                    <span>Bio</span>
                    <textarea name="bio" className={form['form-item']}  placeholder='User bio' onChange={(e) => setBio(e.target.value)} value={bio}></textarea>
                </label>

                <label>
                    <span>System Function</span>
                    <select className={form['form-item']}  name="role" onChange={(e) => setRole(e.target.value)} value={role}>
                        <option value="user">User</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                    </select>
                </label>

                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default MyForm;