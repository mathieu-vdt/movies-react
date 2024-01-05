
import { Link } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { logout } from '../contexts/auth';
import { useAppDispatch } from '../app/hooks';

function Navbar() {
    const isAuthenticated = useSelector((state: RootState) => state.auth.account_id);
    const dispatch = useAppDispatch();
    
    const handleLogout = () => {
        // Dispatch de l'action de déconnexion
        dispatch(logout());
    };
    return (
        <nav>
            <img src="/src/assets/logo.png" alt="" />
            <ul>
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/favourites">Mes favoris</Link></li>
                {isAuthenticated !== null &&  isAuthenticated !== ''? (
                    // Si connecté, afficher le bouton Se déconnecter
                    <li><button onClick={handleLogout}>Se déconnecter</button></li>
                ) : (
                    // Sinon, afficher le bouton Se connecter
                    <li><Link to="/login">Se connecter</Link></li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;

