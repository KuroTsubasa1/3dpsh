<template>
  <div class="impressum-page">
    <div class="container">
      <h1>Impressum</h1>
      
      <section class="impressum-section">
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          3D Print Shop Harm<br>
          Lasse Harm<br>
          Krete 8<br>
          23701 Eutin
        </p>
      </section>

      <section class="impressum-section">
        <h2>Kontakt</h2>
        <p>
          E-Mail: service@3dps.space<br>
          Webseite: <a href="https://3dps.space">www.3dps.space</a>
        </p>
      </section>

      <section class="impressum-section">
        <h2>Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br>
          DE 351 241 205
        </p>
      </section>

      <section class="impressum-section">
        <h2>Steuernummer</h2>
        <p>
          651 942 37704
        </p>
      </section>

      <section class="impressum-section">
        <h2>Angaben zur Berufshaftpflichtversicherung</h2>
        <p>
          Gemäß § 19 UStG wird als Kleinunternehmen keine Umsatzsteuer erhoben und entsprechend nicht ausgewiesen.
        </p>
      </section>

      <section class="impressum-section">
        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>
          Lasse Harm<br>
          Krete 8<br>
          23701 Eutin
        </p>
      </section>

      <section class="impressum-section">
        <h2>Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.<br>
          Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>

      <section class="impressum-section">
        <h2>Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. 
          Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu 
          überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>
        <p>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. 
          Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden 
          von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
        </p>
      </section>

      <section class="impressum-section">
        <h2>Haftung für Links</h2>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese 
          fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber 
          der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. 
          Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
        </p>
        <p>
          Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. 
          Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
        </p>
      </section>

      <section class="impressum-section">
        <h2>Urheberrecht</h2>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die 
          Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der 
          schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, 
          nicht kommerziellen Gebrauch gestattet.
        </p>
        <p>
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere 
          werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten 
          wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
        </p>
      </section>

      <div class="back-link">
        <NuxtLink to="/">← Zurück zur Startseite</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.impressum-page {
  padding: 80px 0 40px;
  min-height: 100vh;
  background-color: var(--gray-50);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  color: var(--gray-900);
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.impressum-section {
  background: white;
  padding: 2rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.impressum-section h2 {
  color: var(--primary-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.impressum-section p {
  color: var(--gray-700);
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.impressum-section a {
  color: var(--primary-color);
  text-decoration: none;
}

.impressum-section a:hover {
  text-decoration: underline;
}

.back-link {
  text-align: center;
  margin-top: 3rem;
}

.back-link a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.back-link a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
  
  .impressum-section {
    padding: 1.5rem;
  }
  
  .impressum-section h2 {
    font-size: 1.25rem;
  }
}
</style>