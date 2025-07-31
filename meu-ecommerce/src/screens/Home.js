import ServicesCard from "../components/ServicesCard.js";
import Footer from "../components/Footer.js";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { useUser } from "../UserContext.js";
import './Home.js';
import { useNavigate } from "react-router";

export async function saveServices(uid, item) {
    const ref = collection(db, "Clients", uid, "NextServices");
    await addDoc(ref, item);
}

export default function Home(){
    const { user, loading } = useUser();
    const navigate = useNavigate();

    const service = {
        Name: "Lustra chifre",
        Add: "Campinas Hall",
        Profissional: "Gabs",
        Time: new Date("2022-11-26T23:00:00")
    };

    if (loading){
      try {
        saveServices(user.uid, service);
      }
      catch{
        navigate('/');
      }
    }

    return (
    <div style={styles.container}>
      {/* Cabeçalho */}
      <div style={styles.header}>
        <div style={styles.userInfo}>
          <img src="https://via.placeholder.com/50" alt="avatar" style={styles.avatar} />
          <div>
            <p style={styles.smallText}>Rua Luverci Pereira de Souza, 1809</p>
            <h2 style={styles.greeting}>Olá, Lana</h2>
            <p style={styles.subGreeting}>Como podemos te ajudar hoje?</p>
          </div>
        </div>
        <div style={styles.logoArea}>
          <span>(LOGO)</span>
          <span style={styles.bell}>🔔</span>
        </div>
      </div>

      {/* Seção: Próximos serviços */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Próximos serviços</h3>
        <div className="hide-scrollbar" style={styles.cardRow}>
            <div style={styles.card}>
              <ServicesCard
              titulo="Troca de piso"
              horario="08h"
              data="14/06"
              profissional="Paulo Amor"
              />
              <ServicesCard titulo="Limpeza de sofá" horario="10h" data="25/05" profissional="Joana Reis" />
              <ServicesCard titulo="Troca de azulejo" horario="14h" data="01/06" profissional="Carlos Pintor" />
              <ServicesCard titulo="Montagem de móveis" horario="09h" data="28/05" profissional="Lucas Lima" />
              <ServicesCard titulo="Reparo elétrico" horario="16h" data="30/05" profissional="Sérgio Luz" />
              <ServicesCard titulo="Desentupimento de pia" horario="17h" data="03/06" profissional="Jéssica Fluxo" />
              <ServicesCard titulo="Limpeza de sofá" horario="10h" data="25/05" profissional="Joana Reis" />
              <ServicesCard titulo="Troca de azulejo" horario="14h" data="01/06" profissional="Carlos Pintor" />
              <ServicesCard titulo="Montagem de móveis" horario="09h" data="28/05" profissional="Lucas Lima" />
              <ServicesCard titulo="Reparo elétrico" horario="16h" data="30/05" profissional="Sérgio Luz" />
              <ServicesCard titulo="Desentupimento de pia" horario="17h" data="03/06" profissional="Jéssica Fluxo" />
            </div>
        </div>
      </div>

      {/* Seção: Minhas solicitações */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Minhas solicitações</h3>
        <div style={styles.cardRow}>
            <div style={styles.card}>
                <ServicesCard
                    titulo = "Polimento de chifre"
                    horario = "08h"
                    data = "14/06"
                    profissional="Gabis"
                />
                <ServicesCard titulo="Pintura de parede" horario="08h" data="02/06" profissional="Marta Tinta" />
                <ServicesCard titulo="Instalação de ar-condicionado" horario="13h" data="04/06" profissional="Ana Fria" />
                <ServicesCard titulo="Jardinagem completa" horario="11h" data="27/05" profissional="Tiago Verde" />
                <ServicesCard titulo="Serviço hidráulico" horario="15h" data="31/05" profissional="Marcos Água" />
                <ServicesCard titulo="Desentupimento de pia" horario="17h" data="03/06" profissional="Jéssica Fluxo" />
                <ServicesCard titulo="Pintura de parede" horario="08h" data="02/06" profissional="Marta Tinta" />
                <ServicesCard titulo="Instalação de ar-condicionado" horario="13h" data="04/06" profissional="Ana Fria" />
                <ServicesCard titulo="Jardinagem completa" horario="11h" data="27/05" profissional="Tiago Verde" />
                <ServicesCard titulo="Serviço hidráulico" horario="15h" data="31/05" profissional="Marcos Água" />
                <ServicesCard titulo="Desentupimento de pia" horario="17h" data="03/06" profissional="Jéssica Fluxo" />

            </div>
        </div>
      </div>

      <Footer />

    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#FFA726',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  avatar: {
    borderRadius: '50%',
    width: '50px',
    height: '50px',
  },
  smallText: {
    fontSize: '12px',
    margin: 0,
  },
  greeting: {
    margin: '2px 0 0',
  },
  subGreeting: {
    margin: 0,
    fontSize: '14px',
  },
  logoArea: {
    textAlign: 'right',
  },
  bell: {
    fontSize: '20px',
    display: 'block',
    marginTop: '5px',
    color: '#6A1B9A',
  },
  section: {
    backgroundColor: '#fff',
    border: '2px solid #1976D2',
    borderRadius: '12px',
    padding: '10px',
    marginBottom: '40px',
    height: '40%',
  },
  sectionTitle: {
    fontSize: '16px',
    color: '#1976D2',
    marginBottom: '10px',
  },
  cardRow: {
    height: '190px',
    display: 'flex',
    gap: '10px',
    overflowX: 'auto',
    overflowY: 'hidden',
  },
  card: {
    flex: 1,
    borderRadius: '8px',
    padding: '5px',
    display: 'flex',
    gap: '10px',
    backgroundColor: '#fff',
    height: '140px',
  },
  cardImage: {
    width: '80px',
    height: '60px',
    borderRadius: '4px',
    objectFit: 'cover',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px 0',
    borderTop: '1px solid #ccc',
    marginTop: 'auto',
    fontSize: '24px',
    color: '#6A1B9A',
  },
  plus: {
    fontSize: '32px',
    color: '#F44336',
  },
};