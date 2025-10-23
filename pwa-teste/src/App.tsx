import { useState, useEffect } from "react";

function App() {
  const [showMore, setShowMore] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [showTopButton, setShowTopButton] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);

  // Dados dos vídeos educativos
  const videosEducativos = [
    {
      id: 1,
      title: "Como Identificar Sinais de Tráfico Humano",
      description: "Aprenda a reconhecer os principais sinais de alerta em situações de tráfico de pessoas",
      duration: "4:32",
      thumbnail: "📹",
      category: "Prevenção"
    },
    {
      id: 2,
      title: "Falsos Recrutamentos: Como se Proteger",
      description: "Entenda as táticas usadas em falsas ofertas de emprego e como evitar cair nestas armadilhas",
      duration: "6:15",
      thumbnail: "🎯",
      category: "Fraudes"
    },
    {
      id: 3,
      title: "Testemunhos de Sobreviventes",
      description: "Histórias reais de pessoas que sobreviveram ao tráfico humano",
      duration: "8:47",
      thumbnail: "👥",
      category: "Conscientização"
    },
    {
      id: 4,
      title: "Segurança Digital para Jovens",
      description: "Dicas essenciais para se proteger online e nas redes sociais",
      duration: "5:23",
      thumbnail: "🔒",
      category: "Educação Digital"
    },
    {
      id: 5,
      title: "Como Ajudar uma Vítima",
      description: "Saiba o que fazer se suspeitar que alguém está em situação de tráfico",
      duration: "7:12",
      thumbnail: "🆘",
      category: "Apoio"
    },
    {
      id: 6,
      title: "Legislação e Direitos",
      description: "Conheça os direitos das vítimas e a legislação contra o tráfico humano",
      duration: "9:05",
      thumbnail: "⚖️",
      category: "Informação Legal"
    }
  ];

  const categories = ["Todos", ...new Set(videosEducativos.map(video => video.category))];
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredVideos = activeCategory === "Todos" 
    ? videosEducativos 
    : videosEducativos.filter(video => video.category === activeCategory);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }

      const sections = ["inicio", "validacao", "denuncia", "informacao", "sobre"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const playVideo = (index: number) => {
    setCurrentVideo(index);
  };

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % filteredVideos.length);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + filteredVideos.length) % filteredVideos.length);
  };

  return (
    <div>
      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #fafafa;
          color: #333;
          scroll-behavior: smooth;
        }
        header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background-color: #b71c1c;
          color: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 3rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          z-index: 1000;
        }
        header h1 {
          font-size: 1.5rem;
          font-weight: bold;
          letter-spacing: 1px;
        }
        nav a {
          color: white;
          text-decoration: none;
          margin: 0 1rem;
          font-weight: 500;
          transition: 0.3s;
          padding: 0.5rem 1rem;
          border-radius: 4px;
        }
        nav a:hover {
          background-color: rgba(255,255,255,0.1);
        }
        nav a.active {
          background-color: rgba(255,255,255,0.2);
          font-weight: bold;
          text-decoration: underline;
        }

        .hero {
          margin-top: 80px;
          text-align: center;
          padding: 6rem 2rem;
          background: linear-gradient(135deg, #b71c1c 0%, #8b0000 100%);
          color: white;
        }
        .hero h2 {
          font-size: 2.5rem;
          color: white;
          font-weight: 800;
          margin-bottom: 1rem;
        }
        .hero p {
          max-width: 700px;
          margin: 0 auto 2rem;
          font-size: 1.2rem;
          line-height: 1.6;
          color: rgba(255,255,255,0.9);
        }
        .hero button {
          background-color: white;
          color: #b71c1c;
          border: none;
          padding: 1rem 2rem;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .hero button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }

        section {
          padding: 5rem 2rem;
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        section h3 {
          font-size: 2.5rem;
          color: #b71c1c;
          margin-bottom: 2rem;
          text-align: center;
        }
        section p {
          max-width: 900px;
          margin: 0 auto;
          line-height: 1.7;
          color: #555;
          font-size: 1.1rem;
          text-align: center;
        }

        .card {
          background: white;
          padding: 2rem;
          margin: 2rem auto;
          border-radius: 15px;
          max-width: 800px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          border-left: 5px solid #b71c1c;
        }

        /* Estilos para a seção de vídeos (dinâmica YouTube) */
        .video-section {
          background: #f8f9fa;
          padding: 4rem 2rem;
        }

        .video-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .video-player {
          background: #000;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .video-placeholder {
          height: 400px;
          background: linear-gradient(45deg, #b71c1c, #8b0000);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 4rem;
          position: relative;
        }

        .video-info {
          padding: 1.5rem;
          background: white;
        }

        .video-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .video-description {
          color: #666;
          line-height: 1.6;
        }

        .video-controls {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .control-btn {
          background: #b71c1c;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .control-btn:hover {
          background: #8b0000;
        }

        .video-list-container {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 2rem;
          margin-top: 2rem;
        }

        .categories-sidebar {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          height: fit-content;
        }

        .category-btn {
          display: block;
          width: 100%;
          padding: 0.75rem 1rem;
          margin-bottom: 0.5rem;
          border: none;
          background: #f8f9fa;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          text-align: left;
          font-weight: 500;
        }

        .category-btn:hover {
          background: #e9ecef;
        }

        .category-btn.active {
          background: #b71c1c;
          color: white;
        }

        .videos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .video-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: pointer;
        }

        .video-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(183, 28, 28, 0.2);
        }

        .video-thumbnail {
          height: 160px;
          background: linear-gradient(45deg, #b71c1c, #8b0000);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          color: white;
          position: relative;
        }

        .video-duration {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
        }

        .video-card-info {
          padding: 1rem;
        }

        .video-card-title {
          font-weight: bold;
          margin-bottom: 0.5rem;
          color: #333;
          line-height: 1.3;
        }

        .video-card-description {
          color: #666;
          font-size: 0.9rem;
          line-height: 1.4;
          margin-bottom: 0.5rem;
        }

        .video-card-category {
          background: #e9ecef;
          color: #495057;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          display: inline-block;
        }

        .denuncia-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin: 3rem auto;
          max-width: 1000px;
        }
        .denuncia-option {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }
        .denuncia-option:hover {
          transform: translateY(-5px);
          border-color: #b71c1c;
          box-shadow: 0 8px 25px rgba(183, 28, 28, 0.2);
        }
        .denuncia-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }
        .grid div {
          background: #fff;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
          border-top: 4px solid #b71c1c;
        }
        .grid div:hover {
          transform: translateY(-5px);
        }
        .grid h4 {
          color: #b71c1c;
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }

        .fraudes-section {
          background: #fff8f8;
          padding: 3rem 2rem;
          border-radius: 15px;
          margin: 3rem auto;
          max-width: 1200px;
        }

        .fraudes-section h4 {
          color: #b71c1c;
          text-align: center;
          font-size: 2rem;
          margin-bottom: 2rem;
        }

        .processo-steps {
          display: flex;
          justify-content: space-between;
          max-width: 1000px;
          margin: 3rem auto;
          gap: 1rem;
        }
        .step {
          text-align: center;
          flex: 1;
        }
        .step-number {
          width: 50px;
          height: 50px;
          background: #b71c1c;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .parceiros-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin: 2rem auto;
          max-width: 800px;
        }
        .parceiro {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          font-weight: 500;
        }

        footer {
          background-color: #333;
          color: white;
          text-align: center;
          padding: 3rem 1rem;
          margin-top: 3rem;
        }
        footer p {
          margin: 0.5rem 0;
        }

        .top-button {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background-color: #b71c1c;
          color: white;
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }
        .top-button:hover {
          background-color: #8b0000;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.4);
        }

        @media (max-width: 768px) {
          header {
            padding: 1rem;
            flex-direction: column;
            gap: 1rem;
          }
          nav {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.5rem;
          }
          nav a {
            margin: 0.2rem;
            font-size: 0.9rem;
          }
          .hero {
            padding: 4rem 1rem;
            margin-top: 120px;
          }
          .hero h2 {
            font-size: 2rem;
          }
          section {
            padding: 3rem 1rem;
          }
          .video-list-container {
            grid-template-columns: 1fr;
          }
          .categories-sidebar {
            order: 2;
          }
          .videos-grid {
            order: 1;
          }
          .processo-steps {
            flex-direction: column;
            gap: 2rem;
          }
        }
      `}</style>

      {/* Navbar */}
      <header>
        <h1>SafeLink</h1>
        <nav>
          {["inicio", "validacao", "denuncia", "informacao", "sobre"].map(section => (
            <a
              key={section}
              href={`#${section}`}
              className={activeSection === section ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section);
              }}
            >
              {section === "inicio" && "Início"}
              {section === "validacao" && "Modelo de Validação"}
              {section === "denuncia" && "Denúncia"}
              {section === "informacao" && "Informação"}
              {section === "sobre" && "Sobre Nós"}
            </a>
          ))}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="hero">
        <h2>SafeLink – Protegendo Vidas, Conectando Segurança</h2>
        <p>
          Combater o tráfico de pessoas através da tecnologia e educação digital. 
          Aprenda a reconhecer os sinais e ajude a proteger quem mais precisa.
        </p>
        <button onClick={() => scrollToSection("denuncia")}>
          Denunciar Agora
        </button>
      </section>

      {/* Seção Modelo de Validação */}
      <section id="validacao">
        <h3>Modelo de Validação de Dados</h3>
        <p>
          O nosso sistema analisa automaticamente as denúncias recebidas e classifica 
          como "normal" ou "suspeito". Dados suspeitos são encaminhados para parceiros 
          institucionais para ação imediata.
        </p>

        <div className="processo-steps">
          <div className="step">
            <div className="step-number">1</div>
            <h4>Submissão</h4>
            <p>Denúncia recebida através dos nossos canais seguros</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h4>Análise</h4>
            <p>Processamento pelo módulo Think Verify</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h4>Classificação</h4>
            <p>Validação como "normal" ou "suspeito"</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h4>Encaminhamento</h4>
            <p>Direcionamento para entidades competentes</p>
          </div>
        </div>

        <div className="grid">
          <div>
            <h4>Validação Automática</h4>
            <p>Análise de padrões e verificação de consistência dos dados submetidos.</p>
          </div>
          <div>
            <h4>Revisão Humana</h4>
            <p>Casos complexos são revisados pela nossa equipa especializada.</p>
          </div>
        </div>
      </section>

      {/* Seção de Denúncia */}
      <section id="denuncia">
        <h3>Denúncia Anónima</h3>
        <p>
          A sua denúncia pode salvar vidas. Escolha o método mais conveniente para reportar 
          situações suspeitas de forma totalmente anónima e segura.
        </p>
        
        <div className="denuncia-grid">
          <div className="denuncia-option">
            <div className="denuncia-icon">📝</div>
            <h4>Denúncia por Texto</h4>
            <p>Descreva a situação em detalhe através do nosso formulário seguro.</p>
          </div>
          <div className="denuncia-option">
            <div className="denuncia-icon">🎤</div>
            <h4>Denúncia por Áudio</h4>
            <p>Grave um áudio explicativo sobre a situação suspeita.</p>
          </div>
          <div className="denuncia-option">
            <div className="denuncia-icon">🖼️</div>
            <h4>Denúncia por Imagem</h4>
            <p>Envie imagens ou documentos como evidência de forma segura.</p>
          </div>
        </div>

        <div className="card">
          <p>
            <strong>Processo Seguro:</strong> Todas as denúncias são processadas pelo módulo 
            <strong> Think Verify</strong> que valida a autenticidade antes do encaminhamento 
            para as entidades competentes.
          </p>
        </div>
      </section>

      {/* Seção de Informação com Conteúdo Completo */}
      <section id="informacao" className="video-section">
        <div className="video-container">
          <h3>Informação e Conscientização</h3>
          <p>
            Aprenda sobre tráfico de pessoas através dos nossos conteúdos educativos. 
            Conheça os sinais de alerta, métodos de prevenção e saiba como se proteger de fraudes.
          </p>

          {/* Player Principal de Vídeos */}
          <div className="video-player">
            <div className="video-placeholder">
              {filteredVideos[currentVideo]?.thumbnail}
            </div>
            <div className="video-info">
              <div className="video-title">
                {filteredVideos[currentVideo]?.title}
              </div>
              <div className="video-description">
                {filteredVideos[currentVideo]?.description}
              </div>
              <div className="video-controls">
                <button className="control-btn" onClick={prevVideo}>
                  ⏮ Anterior
                </button>
                <button className="control-btn" onClick={nextVideo}>
                  Próximo ⏭
                </button>
              </div>
            </div>
          </div>

          {/* Lista de Vídeos */}
          <div className="video-list-container">
            <div className="categories-sidebar">
              <h4 style={{marginTop: 0, color: '#b71c1c'}}>Categorias</h4>
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="videos-grid">
              {filteredVideos.map((video, index) => (
                <div 
                  key={video.id} 
                  className="video-card"
                  onClick={() => playVideo(index)}
                  style={{
                    border: currentVideo === index ? '2px solid #b71c1c' : '2px solid transparent'
                  }}
                >
                  <div className="video-thumbnail">
                    {video.thumbnail}
                    <span className="video-duration">{video.duration}</span>
                  </div>
                  <div className="video-card-info">
                    <div className="video-card-title">{video.title}</div>
                    <div className="video-card-description">{video.description}</div>
                    <span className="video-card-category">{video.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seção de Fraudes integrada na Informação */}
          <div className="fraudes-section">
            <h4>Fraudes e Falsos Recrutamentos</h4>
            <p style={{textAlign: 'center', marginBottom: '2rem'}}>
              Conheça os esquemas mais comuns usados por criminosos para enganar 
              pessoas em busca de oportunidades. Aprenda a identificar sinais de falsas 
              ofertas e mantenha-se seguro.
            </p>
            <div className="grid">
              <div>
                <h4>Ofertas de Emprego Falsas</h4>
                <p>
                  Desconfie de anúncios que pedem pagamento adiantado, documentos pessoais 
                  sem justificação ou que oferecem salários muito acima do mercado.
                </p>
              </div>
              <div>
                <h4>Mensagens Suspeitas</h4>
                <p>
                  Evite clicar em links desconhecidos. Sempre confirme a autenticidade 
                  da empresa através de canais oficiais.
                </p>
              </div>
              <div>
                <h4>Promessas Irreais</h4>
                <p>
                  Se parece bom demais para ser verdade, provavelmente é uma fraude. 
                  Empregos legítimos têm processos seletivos transparentes.
                </p>
              </div>
            </div>

            <div className="card" style={{marginTop: '2rem'}}>
              <h4 style={{color: '#b71c1c', marginTop: 0}}>Sinais de Alerta</h4>
              <p>
                <strong>Fique atento a estes sinais:</strong><br/>
                • Ofertas de emprego com condições pouco claras<br/>
                • Pressão para aceitar propostas imediatamente<br/>
                • Isolamento social e controle de comunicação<br/>
                • Documentos retidos por terceiros<br/>
                • Condições de trabalho exploratórias<br/>
                • Contato apenas por redes sociais ou apps de mensagem
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Sobre Nós */}
      <section id="sobre" style={{backgroundColor: '#f8f9fa'}}>
        <h3>Sobre Nós</h3>
        <p>
          O SafeLink é uma iniciativa dedicada a combater o tráfico de pessoas através 
          de tecnologia inovadora e parcerias estratégicas.
        </p>

        <div className="card">
          <h4 style={{color: '#b71c1c', marginTop: 0}}>Nossa Missão</h4>
          <p>
            Proteger vidas através de uma plataforma digital segura que identifica 
            padrões suspeitos de recrutamento online, educa jovens sobre riscos digitais 
            e fornece meios de denúncia anónima.
          </p>
        </div>

        <h4 style={{textAlign: 'center', color: '#b71c1c', marginTop: '3rem'}}>Parceiros Institucionais</h4>
        <div className="parceiros-grid">
          <div className="parceiro">PGR</div>
          <div className="parceiro">MINEC</div>
          <div className="parceiro">ONG Parceiras</div>
          <div className="parceiro">Entidades Sociais</div>
        </div>

        <div className="card" style={{marginTop: '2rem'}}>
          <h4 style={{color: '#b71c1c', marginTop: 0}}>Contactos</h4>
          <p>
            <strong>Email:</strong> contacto@safelink.org<br/>
            <strong>Telefone:</strong> +258 84 000 0000<br/>
            <strong>Emergência:</strong> 119<br/>
            <strong>Horário:</strong> Atendimento 24/7 para denúncias
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 SafeLink — Todos os direitos reservados.</p>
        <p>Protegendo Vidas, Conectando Segurança</p>
        <p>Contacto: safelink@protecao.org | +258 84 000 0000</p>
      </footer>

      {/* Botão Topo */}
      {showTopButton && (
        <button className="top-button" onClick={scrollToTop} aria-label="Voltar ao topo">
          ↑
        </button>
      )}
    </div>
  );
}

export default App;