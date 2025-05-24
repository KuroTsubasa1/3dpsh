<script setup lang="ts">
</script>

<template>
  <div>
    <!-- Header Component -->
    <TheHeader />
    
    <div class="container">
      <!-- Hero Component -->
      <TheHero />
      
      <!-- Introduction Section -->
      <section>
        <h2>Warum 3D Print Shop Harm?</h2>
        <p>
          Bei 3D Print Shop Harm bekommst du professionellen 3D Druck Service, der deine individuellen 3D Modelle schnell und präzise zum Leben erweckt. Deine Zufriedenheit ist unser Antrieb, und wir garantieren dir erstklassige Ergebnisse.
        </p>
      </section>
      
      <!-- Services Section -->
      <TheGrid title="Our Services">
        <TheCard 
          title="FDM-Druck - Vielseitig und robust"
          content="FDM-Druck: bis zu 400 x 400 x 450 mm 🌟
          
Entdecke die Welt des FDM-Drucks, die ideale Lösung für strapazierfähige und funktionale 3D-Modelle! Mit dem FDM-Druck können wir aus einer Vielzahl von Materialien, wie PLA, PETG oder TPU, lebensechte Objekte erstellen. Ob Prototypen, Ersatzteile oder persönliche Kreationen – mit FDM-Druck sind deiner Fantasie keine Grenzen gesetzt. Lass dich von der Vielseitigkeit und Robustheit des FDM-Drucks begeistern und bring deine Ideen in die dritte Dimension!"
        />
        <TheCard 
          title="Resin-Druck - Detailverliebt und präzise"
          content="Resin-Druck: bis zu 130 x 80 x 150 mm🌟
          
Tauche ein in die faszinierende Welt des Resin-Drucks, perfekt für Miniaturen, Schmuck und filigrane Modelle! Mit Resin-Druck bieten wir dir höchste Detailgenauigkeit und extrem glatte Oberflächen. Die Präzision dieses Druckverfahrens ermöglicht es, selbst kleinste Details und feinste Strukturen sichtbar zu machen. Entdecke den Resin-Druck für anspruchsvolle Projekte, bei denen es auf jedes Detail ankommt, und verleihe deinen Kreationen den letzten Schliff!"
        />
        <TheCard 
          title="3D-Modellierung - Individuell und professionell"
          content="3D-Modellierung: Kreativ. Detailgetreu. Individuell 🚀
          
Erforsche die aufregende Welt der 3D-Modellierung und verwandle deine Ideen in einzigartige, maßgeschneiderte Modelle! Bei 3D Print Shop Harm bieten wir dir nicht nur qualitativ hochwertige 3D-Drucke, sondern auch professionelle 3D-Modellierung. Unser Expertenteam verwandelt deine Skizzen, Fotos oder Beschreibungen in realistische und präzise 3D-Modelle, die genau deinen Vorstellungen entsprechen. Egal, ob du ein individuelles Design für dein Unternehmen, ein besonderes Geschenk oder ein persönliches Projekt benötigst – mit unserer 3D-Modellierung bringen wir deine Ideen zum Leben und bereiten sie optimal für den 3D-Druck vor. Lass uns gemeinsam deine Visionen verwirklichen!"
        />
      </TheGrid>
      
      <!-- Portfolio Section -->
      <TheGrid title="Our Portfolio">
        <TheCard 
          title="Project 1"
          content="Description of Project 1"
          image="/portfolio-item-1.jpg"
        />
        <TheCard 
          title="Project 2"
          content="Description of Project 2"
          image="/portfolio-item-2.jpg"
        />
        <TheCard 
          title="Project 3"
          content="Description of Project 3"
          image="/portfolio-item-3.jpg"
        />
      </TheGrid>
      
      <!-- About Us Section -->
      <TheGrid title="About Us">
        <TheCard 
          title="Our Story"
          content="Description of the company's history and mission."
        />
        <TheCard 
          title="Our Team"
          content="Description of the team members and their expertise."
        />
        <TheCard 
          title="Our Technologies"
          content="Description of the 3D printing technologies used in the company."
        />
      </TheGrid>
      
      <!-- Contact Form -->
      <TheContactForm />
    </div>
    
    <!-- Footer Component -->
    <TheFooter />
  </div>
</template>