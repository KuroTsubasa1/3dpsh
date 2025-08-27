<template>
  <div class="container">
    <header class="header">
      <h1>Coaster Catalog</h1>
      <p>3D Print Shop Harm</p>
    </header>


    <div class="catalog-grid">
      <template v-for="(franchise, franchiseIndex) in franchises" :key="franchise.name">
        <div class="franchise-divider">
          <h2>{{ franchise.displayName }}</h2>
          <div class="franchise-count">{{ franchise.coasters.length }} coasters</div>
        </div>
        
        <div
          v-for="(coaster, coasterIndex) in franchise.coasters"
          :key="`${franchise.name}-${coasterIndex}`"
          class="coaster-card"
        >
          <div class="coaster-number">#{{ coaster.number }}</div>
          <div class="coaster-image">
            <img 
              :src="coaster.image" 
              :alt="coaster.name"
              @error="handleImageError"
            />
          </div>
          <div class="coaster-info">
            <h3 class="coaster-name">{{ coaster.name }}</h3>
            <p class="coaster-description">{{ coaster.description }}</p>
          </div>
        </div>
      </template>
    </div>

    <footer class="footer">
      <p>&copy; 2025 Coaster Catalog. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
const ALL_IMAGE_FILES = [
  "Kpop demon hunters/2025-08-23_5e2daa73eee86.webp", "Kpop demon hunters/2025-08-23_9f8b5126b0d5f8.webp",
  "Kpop demon hunters/2025-08-23_b168edf4bc21c.webp", "Kpop demon hunters/2025-08-23_c20d7862f8cab8.webp",
  "Kpop demon hunters/2025-08-23_c26fec08d16fc.webp", "Kpop demon hunters/2025-08-23_cd495ecbc31cc.webp",
  "Kpop demon hunters/2025-08-23_f024c7bb396c7.webp", "Kpop demon hunters/2025-08-23_fa683406c182.webp",
  "digimon/2024-11-23_0547447a339b3.jpg", "digimon/2024-11-23_3849219bd8186.jpg",
  "digimon/2024-11-23_3e619f704e323.jpg", "digimon/2024-11-23_9d2916364b921.jpg",
  "digimon/2024-11-23_a9ff4af555ded.jpg", "digimon/2024-11-23_b12c48000f139.jpg",
  "digimon/dragonball_bardock.jpg", "digimon/dragonball_gohan.jpg",
  "digimon/dragonball_goku.jpg", "digimon/dragonball_krillin.jpg",
  "digimon/dragonball_nappa.jpg", "digimon/dragonball_piccolo.jpg",
  "digimon/dragonball_raditz.jpg", "digimon/dragonball_tien.jpg",
  "digimon/dragonball_vegeta.jpg", "digimon/dragonball_yamcha.jpg",
  "digimon/mario_blooper.jpg", "digimon/mario_bullet.jpg",
  "digimon/mario_cheep.jpg", "digimon/mario_goomba.jpg",
  "digimon/mario_hammer.jpg", "digimon/mario_lakitu.jpg",
  "digimon/mario_piranha.jpg", "digimon/mario_thwomp.jpg",
  "digimon/myheroacademia_allmight.jpg", "digimon/myheroacademia_bakugo.jpg",
  "digimon/myheroacademia_deku.jpg", "digimon/myheroacademia_iida.jpg",
  "digimon/myheroacademia_todoroki.jpg", "digimon/myheroacademia_uraraka.jpg",
  "digimon/onepiece_jozu.jpg", "digimon/onepiece_vista.jpg",
  "digimon/scooby_fred.jpg", "digimon/scooby_scooby.jpg",
  "digimon/scooby_shaggy.jpg", "digimon/scooby_velma.jpg",
  "digimon/starwars_boba.jpg", "digimon/starwars_c3po.jpg",
  "digimon/starwars_obiwan.jpg", "digimon/starwars_r2d2.jpg",
  "dragon ball/2024-11-02_a66ae2f3ee0c9.jpg", "dragon ball/2024-11-02_a74ecc1f6fc9c.jpg",
  "dragon ball/2024-11-02_a804b1987d00e.jpg", "dragon ball/2024-11-02_a90c3c341547d.jpg",
  "dragon ball/2024-11-02_adc371b21d913.jpg", "dragon ball/2024-11-02_cb3082f69920e.jpg",
  "dragon ball/2024-11-02_cbda7bca92ce8.jpg", "dragon ball/2024-11-02_cead511fdfbd4.jpg",
  "dragon ball/2024-11-02_d1a3f1070c071.jpg", "dragon ball/2024-11-02_f0bbe6296101d.jpg",
  "dragon ball/2024-11-02_f141e94195bb9.jpg", "dragon ball/2024-11-04_7de97df2a6cc4.jpg",
  "dragon ball/2024-11-04_c903cb5ade2fb.jpg", "dragon ball/avatar_aang.jpg",
  "dragon ball/avatar_sokka.jpg", "dragon ball/avatar_toph.jpg",
  "dragon ball/dragonball_trunks.jpg", "dragon ball/mario_luigi.jpg",
  "dragon ball/mario_mario.jpg", "dragon ball/mario_peach.jpg",
  "dragon ball/mario_toad.jpg", "dragon ball/mario_yoshi.jpg",
  "dragon ball/onepiece_jimbe.jpg", "dragon ball/pokemon_chansey.jpg",
  "dragon ball/pokemon_custom001.jpg", "dragon ball/pokemon_custom002.jpg",
  "dragon ball/pokemon_custom003.jpg", "dragon ball/pokemon_custom004.jpg",
  "dragon ball/pokemon_custom005.jpg", "dragon ball/pokemon_custom006.jpg",
  "dragon ball/pokemon_custom007.jpg", "dragon ball/pokemon_custom008.jpg",
  "dragon ball/pokemon_custom009.jpg", "dragon ball/pokemon_custom010.jpg",
  "dragon ball/pokemon_custom026.jpg", "dragon ball/pokemon_custom027.jpg",
  "dragon ball/pokemon_custom028.jpg", "dragon ball/pokemon_custom029.jpg",
  "dragon ball/pokemon_custom030.jpg", "dragon ball/pokemon_custom031.jpg",
  "dragon ball/pokemon_custom032.jpg", "dragon ball/pokemon_custom033.jpg",
  "dragon ball/pokemon_custom034.jpg", "dragon ball/pokemon_custom035.jpg",
  "dragon ball/pokemon_custom036.jpg", "dragon ball/pokemon_custom037.jpg",
  "dragon ball/pokemon_custom038.jpg", "dragon ball/pokemon_custom039.jpg",
  "dragon ball/pokemon_custom040.jpg", "dragon ball/pokemon_custom057.jpg",
  "dragon ball/pokemon_custom058.jpg", "dragon ball/pokemon_custom059.jpg",
  "dragon ball/pokemon_custom060.jpg", "dragon ball/pokemon_custom061.jpg",
  "dragon ball/pokemon_custom062.jpg", "dragon ball/pokemon_custom063.jpg",
  "dragon ball/pokemon_custom064.jpg", "dragon ball/pokemon_custom065.jpg",
  "dragon ball/pokemon_custom066.jpg", "dragon ball/pokemon_custom067.jpg",
  "dragon ball/pokemon_custom068.jpg", "dragon ball/pokemon_custom069.jpg",
  "dragon ball/pokemon_custom070.jpg", "dragon ball/pokemon_custom071.jpg",
  "dragon ball/pokemon_custom072.jpg", "dragon ball/pokemon_custom073.jpg",
  "dragon ball/pokemon_custom074.jpg", "dragon ball/pokemon_custom075.jpg",
  "dragon ball/pokemon_custom076.jpg", "dragon ball/pokemon_custom077.jpg",
  "dragon ball/pokemon_custom078.jpg", "dragon ball/pokemon_custom079.jpg",
  "dragon ball/pokemon_custom088.jpg", "dragon ball/pokemon_custom089.jpg",
  "dragon ball/pokemon_custom090.jpg", "dragon ball/pokemon_custom091.jpg",
  "dragon ball/pokemon_custom092.jpg", "dragon ball/pokemon_custom093.jpg",
  "dragon ball/pokemon_custom094.jpg", "dragon ball/pokemon_custom095.jpg",
  "dragon ball/pokemon_custom096.jpg", "dragon ball/pokemon_goldeen.jpg",
  "dragon ball/pokemon_horsea.jpg", "dragon ball/pokemon_jynx.jpg",
  "dragon ball/pokemon_kangaskhan.jpg", "dragon ball/pokemon_mrmime.jpg",
  "dragon ball/pokemon_scyther.jpg", "dragon ball/pokemon_seaking.jpg",
  "dragon ball/pokemon_starmie.jpg", "dragon ball/pokemon_staryu.jpg",
  "hazbin hotel/pokemon_custom117.jpg", "hazbin hotel/pokemon_custom118.jpg",
  "hazbin hotel/pokemon_custom119.jpg", "hazbin hotel/pokemon_custom120.jpg",
  "hazbin hotel/pokemon_custom121.jpg", "mario/pokemon_custom015.jpg",
  "mario/pokemon_custom016.jpg", "mario/pokemon_custom017.jpg",
  "mario/pokemon_custom018.jpg", "mario/pokemon_custom019.jpg",
  "mario/pokemon_custom020.jpg", "mario/pokemon_custom021.jpg",
  "mario/pokemon_custom022.jpg", "mario/pokemon_custom023.jpg",
  "mario/pokemon_custom024.jpg", "mario/pokemon_custom025.jpg",
  "my hero akademia/pokemon_custom103.jpg", "my hero akademia/pokemon_custom104.jpg",
  "my hero akademia/pokemon_custom105.jpg", "my hero akademia/pokemon_custom106.jpg",
  "my hero akademia/pokemon_custom107.jpg", "my hero akademia/pokemon_custom108.jpg",
  "my hero akademia/pokemon_custom109.jpg", "one piece/2024-12-29_1601b6dd67ad7.jpg",
  "one piece/2024-12-29_18f465093f6c2.jpg", "one piece/2024-12-29_26c4658871d3c.jpg",
  "one piece/2024-12-29_39bc6b990128.jpg", "one piece/2024-12-29_4493756ae91db.jpg",
  "one piece/2024-12-29_4b7386ace359.jpg", "one piece/2024-12-29_4f9706d35973c.jpg",
  "one piece/2024-12-29_4fd0bccde6c3f.jpg", "one piece/2024-12-29_512cdd9826d4a.jpg",
  "one piece/2024-12-29_52a97167ee894.jpg", "one piece/2024-12-29_60dc31d2da3de.jpg",
  "one piece/2024-12-29_e11e546020f1b.jpg", "one piece/2024-12-29_e12ce1a79e3ab.jpg",
  "one piece/2024-12-29_e7a1c02d755d2.jpg", "one piece/2024-12-29_ebbf32d32e8b3.jpg",
  "one piece/2024-12-29_ef7bbe0d627d9.jpg", "one piece/2024-12-29_f31759414681f.jpg",
  "one piece/dragonball_android17.jpg", "one piece/dragonball_android18.jpg",
  "one piece/dragonball_burter.jpg", "one piece/dragonball_chiaotzu.jpg",
  "one piece/dragonball_cooler.jpg", "one piece/dragonball_dodoria.jpg",
  "one piece/dragonball_ginyu.jpg", "one piece/dragonball_guldo.jpg",
  "one piece/dragonball_jeice.jpg", "one piece/dragonball_recoome.jpg",
  "one piece/dragonball_zarbon.jpg", "one piece/mario_koopa.jpg",
  "one piece/onepiece_ace.jpg", "one piece/onepiece_arlong.jpg",
  "one piece/onepiece_bigmom.jpg", "one piece/onepiece_blackbeard.jpg",
  "one piece/onepiece_brook.jpg", "one piece/onepiece_chopper.jpg",
  "one piece/onepiece_crocodile.jpg", "one piece/onepiece_doflamingo.jpg",
  "one piece/onepiece_enel.jpg", "one piece/onepiece_franky.jpg",
  "one piece/onepiece_jinbe.jpg", "one piece/onepiece_kaido.jpg",
  "one piece/onepiece_katakuri.jpg", "one piece/onepiece_luffy.jpg",
  "one piece/onepiece_marco.jpg", "one piece/onepiece_nami.jpg",
  "one piece/onepiece_robin.jpg", "one piece/onepiece_sabo.jpg",
  "one piece/onepiece_sanji.jpg", "one piece/onepiece_shanks.jpg",
  "one piece/onepiece_usopp.jpg", "one piece/onepiece_whitebeard.jpg",
  "one piece/onepiece_zoro.jpg", "one piece/pokemon_dodrio.jpg",
  "one piece/pokemon_doduo.jpg", "one piece/pokemon_farfetchd.jpg",
  "one piece/pokemon_kingler.jpg", "one piece/pokemon_koffing.jpg",
  "one piece/pokemon_krabby.jpg", "one piece/pokemon_magnemite.jpg",
  "one piece/pokemon_magnezone.jpg", "one piece/pokemon_rapidash.jpg",
  "one piece/pokemon_rhydon.jpg", "one piece/pokemon_rhyhorn.jpg",
  "one piece/pokemon_seel.jpg", "one piece/pokemon_slowbro.jpg",
  "one piece/pokemon_tentacruel.jpg", "one piece/starwars_yoda.jpg",
  "pokemon/2024-11-18_571449280d2fb.jpg", "pokemon/2024-11-18_967875302ccc6.jpg",
  "pokemon/2024-12-16_cff70913c4f28.jpg", "pokemon/2024-12-16_e949cee5a5147.jpg",
  "pokemon/2024-12-17_85296847ad4dc.jpg", "pokemon/dragonball_broly.jpg",
  "pokemon/dragonball_buu.jpg", "pokemon/dragonball_cell.jpg",
  "pokemon/dragonball_frieza.jpg", "pokemon/dragonball_goten.jpg",
  "pokemon/mario_bowser.jpg", "pokemon/mario_paratroopa.jpg",
  "pokemon/mario_wiggler.jpg", "pokemon/onepiece_blamenco.jpg",
  "pokemon/onepiece_izo.jpg", "pokemon/onepiece_thatch.jpg",
  "pokemon/pokemon_alakazam.jpg", "pokemon/pokemon_arbok.jpg",
  "pokemon/pokemon_beedrill.jpg", "pokemon/pokemon_blastoise.jpg",
  "pokemon/pokemon_bulbasaur.jpg", "pokemon/pokemon_butterfree.jpg",
  "pokemon/pokemon_caterpie.jpg", "pokemon/pokemon_charizard.jpg",
  "pokemon/pokemon_charmander.jpg", "pokemon/pokemon_charmeleon.jpg",
  "pokemon/pokemon_chespin.jpg", "pokemon/pokemon_clefable.jpg",
  "pokemon/pokemon_clefairy.jpg", "pokemon/pokemon_cloyster.jpg",
  "pokemon/pokemon_cubone.jpg", "pokemon/pokemon_custom011.jpg",
  "pokemon/pokemon_custom012.jpg", "pokemon/pokemon_custom013.jpg",
  "pokemon/pokemon_custom014.jpg", "pokemon/pokemon_custom041.jpg",
  "pokemon/pokemon_custom042.jpg", "pokemon/pokemon_custom043.jpg",
  "pokemon/pokemon_custom044.jpg", "pokemon/pokemon_custom045.jpg",
  "pokemon/pokemon_custom046.jpg", "pokemon/pokemon_custom047.jpg",
  "pokemon/pokemon_custom048.jpg", "pokemon/pokemon_custom049.jpg",
  "pokemon/pokemon_custom050.jpg", "pokemon/pokemon_custom051.jpg",
  "pokemon/pokemon_custom052.jpg", "pokemon/pokemon_custom054.jpg",
  "pokemon/pokemon_custom056.jpg", "pokemon/pokemon_custom081.jpg",
  "pokemon/pokemon_custom083.jpg", "pokemon/pokemon_custom086.jpg",
  "pokemon/pokemon_custom087.jpg", "pokemon/pokemon_custom097.jpg",
  "pokemon/pokemon_custom099.jpg", "pokemon/pokemon_custom101.jpg",
  "pokemon/pokemon_custom102.jpg", "pokemon/pokemon_custom115.jpg",
  "pokemon/pokemon_custom116.jpg", "pokemon/pokemon_dewgong.jpg",
  "pokemon/pokemon_diglett.jpg", "pokemon/pokemon_drowzee.jpg",
  "pokemon/pokemon_dugtrio.jpg", "pokemon/pokemon_ekans.jpg",
  "pokemon/pokemon_electabuzz.jpg", "pokemon/pokemon_electrode.jpg",
  "pokemon/pokemon_exeggcute.jpg", "pokemon/pokemon_exeggutor.jpg",
  "pokemon/pokemon_fearow.jpg", "pokemon/pokemon_gastly.jpg",
  "pokemon/pokemon_gengar.jpg", "pokemon/pokemon_gloom.jpg",
  "pokemon/pokemon_golbat.jpg", "pokemon/pokemon_grimer.jpg",
  "pokemon/pokemon_gyarados.jpg", "pokemon/pokemon_haunter.jpg",
  "pokemon/pokemon_hitmonchan.jpg", "pokemon/pokemon_hitmonlee.jpg",
  "pokemon/pokemon_hypno.jpg", "pokemon/pokemon_ivysaur.jpg",
  "pokemon/pokemon_jigglypuff.jpg", "pokemon/pokemon_kakuna.jpg",
  "pokemon/pokemon_leafeon.jpg", "pokemon/pokemon_lickitung.jpg",
  "pokemon/pokemon_machamp.jpg", "pokemon/pokemon_marowak.jpg",
  "pokemon/pokemon_meowth.jpg", "pokemon/pokemon_metapod.jpg",
  "pokemon/pokemon_muk.jpg", "pokemon/pokemon_nidoking.jpg",
  "pokemon/pokemon_nidoqueen.jpg", "pokemon/pokemon_nidorina.jpg",
  "pokemon/pokemon_nidorino.jpg", "pokemon/pokemon_ninetales.jpg",
  "pokemon/pokemon_oddish.jpg", "pokemon/pokemon_onix.jpg",
  "pokemon/pokemon_paras.jpg", "pokemon/pokemon_parasect.jpg",
  "pokemon/pokemon_persian.jpg", "pokemon/pokemon_pidgeot.jpg",
  "pokemon/pokemon_pidgeotto.jpg", "pokemon/pokemon_pidgey.jpg",
  "pokemon/pokemon_pikachu.jpg", "pokemon/pokemon_psyduck.jpg",
  "pokemon/pokemon_raichu.jpg", "pokemon/pokemon_raticate.jpg",
  "pokemon/pokemon_rattata.jpg", "pokemon/pokemon_sandshrew.jpg",
  "pokemon/pokemon_sandslash.jpg", "pokemon/pokemon_seadra.jpg",
  "pokemon/pokemon_shellder.jpg", "pokemon/pokemon_spearow.jpg",
  "pokemon/pokemon_squirtle.jpg", "pokemon/pokemon_tangela.jpg",
  "pokemon/pokemon_tentacool.jpg", "pokemon/pokemon_venomoth.jpg",
  "pokemon/pokemon_venonat.jpg", "pokemon/pokemon_venusaur.jpg",
  "pokemon/pokemon_victreebel.jpg", "pokemon/pokemon_vileplume.jpg",
  "pokemon/pokemon_voltorb.jpg", "pokemon/pokemon_vulpix.jpg",
  "pokemon/pokemon_wartortle.jpg", "pokemon/pokemon_weedle.jpg",
  "pokemon/pokemon_weezing.jpg", "pokemon/pokemon_wigglytuff.jpg",
  "pokemon/pokemon_zubat.jpg", "pokemon/scooby_daphne.jpg",
  "pokemon/starwars_chewbacca.jpg", "pokemon/starwars_han.jpg",
  "pokemon/starwars_leia.jpg", "pokemon/starwars_luke.jpg",
  "pokemon/starwars_vader.jpg", "skoobi doo/pokemon_custom110.jpg",
  "skoobi doo/pokemon_custom111.jpg", "skoobi doo/pokemon_custom112.jpg",
  "skoobi doo/pokemon_custom113.jpg", "skoobi doo/pokemon_custom114.jpg",
  "sonic/2025-03-18_bd3961757172b.jpg", "sonic/avatar_katara.jpg",
  "sonic/hazbin_alastor.jpg", "sonic/hazbin_angel.jpg",
  "sonic/hazbin_charlie.jpg", "sonic/hazbin_vaggie.jpg",
  "star wars/pokemon_custom080.jpg", "star wars/pokemon_custom082.jpg",
  "star wars/pokemon_custom084.jpg", "star wars/pokemon_custom085.jpg",
  "star wars/pokemon_custom098.jpg", "star wars/pokemon_custom100.jpg",
  "Highschool DXD/pokemon_custom055.jpg"
];

const franchiseNames = {
  'Kpop demon hunters': 'Kpop Demon Hunters',
  'my hero akademia': 'My Hero Academia',
  'skoobi doo': 'Scooby Doo', 
  'mario': 'Super Mario',
  'sonic': 'Sonic the Hedgehog',
  'pokemon': 'Pokemon',
  'one piece': 'One Piece',
  'dragon ball': 'Dragon Ball',
  'star wars': 'Star Wars',
  'digimon': 'Digimon',
  'hazbin hotel': 'Hazbin Hotel',
  'Highschool DXD': 'Highschool DXD'
};

const franchises = ref([]);
const totalCoasters = ref(0);

function generateCoasterData() {
  const franchiseMap = new Map();
  
  ALL_IMAGE_FILES.forEach((filePath, index) => {
    const folderParts = filePath.split('/');
    const franchise = folderParts[0];
    const filename = folderParts[1];
    
    if (!franchiseMap.has(franchise)) {
      franchiseMap.set(franchise, {
        name: franchise,
        displayName: franchiseNames[franchise] || franchise,
        coasters: []
      });
    }
    
    const dateMatch = filename.match(/(\d{4}-\d{2}-\d{2})/);
    const date = dateMatch ? dateMatch[1] : '2024-01-01';
    
    const franchiseData = franchiseMap.get(franchise);
    const number = String(franchiseData.coasters.length + 1).padStart(3, '0');
    
    franchiseData.coasters.push({
      number: number,
      name: `Coaster #${number}`,
      date: date,
      image: `/coaster_catalog/images/${filePath}`,
      description: ''
    });
  });
  
  franchises.value = Array.from(franchiseMap.values());
  totalCoasters.value = ALL_IMAGE_FILES.length;
}

function handleImageError(event) {
  event.target.parentElement.innerHTML = '🎢';
}

onMounted(() => {
  generateCoasterData();
});

useHead({
  title: 'Coaster Catalog - 3D Print Shop Harm',
  meta: [
    { name: 'description', content: 'Browse our complete catalog of 3D printed coasters organized by franchise.' }
  ]
});
</script>

<style scoped>
:root {
  --primary-color: #6aaa43;
  --primary-dark: #5a9236;
  --primary-light: #7bc04f;
  --secondary-color: #727271;
  --secondary-dark: #5a5a59;
  --secondary-light: #8a8a89;
  --accent-color: #e6e6e6;
  --accent-dark: #d0d0d0;
  --accent-green: #6aaa43;
  --dark-bg: #20201f;
  --light-bg: #f5f5f5;
  --text-dark: #20201f;
  --text-light: #f5f5f5;
  --text-muted: #727271;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: var(--text-light);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(106, 170, 67, 0.2);
}

.header h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.header p {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.coaster-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.coaster-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: var(--primary-color);
}

.coaster-number {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--primary-color);
  color: var(--text-light);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

.coaster-image {
  width: 100%;
  height: 200px;
  border-radius: 12px;
  margin-bottom: 1rem;
  background: var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--text-muted);
}

.coaster-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.coaster-info {
  margin-top: 1rem;
}

.coaster-name {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.coaster-date {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.coaster-description {
  color: var(--secondary-color);
  font-size: 0.95rem;
  line-height: 1.5;
}


.franchise-divider {
  width: 100%;
  margin: 3rem 0 2rem 0;
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  border-radius: 12px;
  text-align: center;
  color: var(--text-light);
  box-shadow: 0 4px 15px rgba(106, 170, 67, 0.2);
  grid-column: 1 / -1;
}

.franchise-divider h2 {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
  text-transform: capitalize;
  letter-spacing: 0.5px;
}

.franchise-count {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 0.5rem;
}

.footer {
  text-align: center;
  padding: 2rem 0;
  color: var(--text-muted);
  border-top: 1px solid var(--accent-dark);
  margin-top: 3rem;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .catalog-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .stats {
    flex-direction: column;
    gap: 1.5rem;
  }
}
</style>