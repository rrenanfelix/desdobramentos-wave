/* DESDOBRAMENTOS WAVE — frontend simples, sem dependencias. i18n PT/ES */
const $ = s => document.querySelector(s);
const API = p => (location.pathname.replace(/\/$/, '') + '/api/' + p);
let D = null, view = 'rodadas';
const RO = !!window.__DATA__;  // site estático publicado: somente leitura
let lang = new URLSearchParams(location.search).get('lang') || localStorage.getItem('desd_lang') || 'pt';

const I18N = {
  pt: {
    locale: 'pt-BR', updated: 'atualizado', fx_na: 'cotação indisponível', manual: 'manual',
    nav_rodadas: 'Rodadas', nav_resumo: 'Resumo', nav_nova: '+ Rodada', nav_conf: 'Config',
    t_investido: 'Investido', t_retorno: 'Retorno', t_lucro: 'Lucro', t_roi: 'ROI', t_jogos: 'Jogos', t_rodadas: 'Rodadas', t_verdes: 'Bilhetes verdes',
    rodada: 'rodada', rodadas: 'rodadas', pendente: 'pendente', pendentes: 'pendentes', acerto: 'acerto', aberta: 'aberta', abertas: 'abertas', das_comb: 'das combinações',
    empty_rodadas: 'Nenhuma rodada ainda. Clique em <b>+ Rodada</b> pra criar a primeira.', sem_rodadas: 'Sem rodadas.',
    st_aberto: 'aberto', st_fechado: 'fechado', st_vazio: 'vazio', l_fechado: 'fechado', l_aberto: 'em aberto', l_vazio: 'sem lançamento',
    max: 'máx.', cambio: 'câmbio', cambio_rodada: 'câmbio da rodada', atual: 'atual', add_aposta: '+ aposta', renomear: 'renomear', remover: 'remover', remover_lado: 'remover aposta', editar: 'editar',
    em_aberto: 'em aberto', apostado: 'apostado', aguardando: 'aguardando fechamento', apostado_ars: 'Apostado (ARS)', fechamento_ars: 'Fechamento (ARS)', conta: 'Conta', salvar: 'Salvar',
    lancar_bilhetes: 'Lançar bilhetes individuais (desdobramento automático)', ph_jogo: 'Jogo (ex. Monaco x Lens)', ph_pernas: 'Pernas', ph_pernas_long: 'Pernas (ex. Monaco vence + Lens +5.5 esc + +13.5 chutes)', add_jogo: '+ jogo',
    sem_nome: 'sem nome', inv: 'inv', ret: 'ret', lucro: 'lucro', sobrescrever: 'sobrescrever total apostado / fechamento', totais_manuais: 'totais manuais', fechou_com: 'fechou com',
    th_jogo: 'Jogo / bilhete', th_odd: 'Odd', th_resultado: 'Resultado', stake_por: 'stake por bilhete', defina_stakes: 'defina stakes',
    combinacoes: 'combinações', verdes: 'verdes', vermelhas: 'vermelhas', max_restante: 'máx. restante', bilhete_verde: 'bilhete verde', bilhetes_verdes: 'bilhetes verdes',
    k1: 'Simples', k2: 'Duplas', k3: 'Triplas', k4: 'Quádruplas', k5: 'Quíntuplas', k6: 'Sêxtuplas', k1s: 'Simples', k2s: 'Dupla', k3s: 'Tripla', k4s: 'Quádrupla', k5s: 'Quíntupla', k6s: 'Sêxtupla',
    s_pendente: 'Pendente', s_green: 'Green', s_red: 'Red', s_void: 'Void',
    c_remover_jogo: 'Remover este jogo?', p_jogo: 'Jogo:', p_pernas: 'Pernas / descrição:', p_odd: 'Odd:', jogo_add: 'jogo adicionado', p_nome_aposta: 'Nome da aposta:', aposta: 'Aposta',
    lanc_salvo: 'lançamento salvo', p_total_apostado: 'Total apostado (ARS) — vazio = calcular pelos bilhetes:', p_total_ret: 'Total retornado / fechamento (ARS) — vazio = em aberto:', p_conta: 'Conta:',
    c_remover_lado: 'Remover a aposta inteira com todos os jogos?', c_apagar_rodada: 'Apagar a rodada {id} inteira?', p_nome_rodada: 'Nome da rodada:', p_cambio_rodada: 'Câmbio BRL→ARS da rodada (vazio = usa atual):', p_conta_banca: 'Conta (de quem é a banca):', p_notas: 'Notas:',
    h_conta: 'Por conta', th_conta: 'Conta', th_fechadas: 'Apostas fechadas', th_lucro_ars: 'Lucro ARS', th_lucro_brl: 'Lucro BRL', h_rodada: 'Por rodada', h_rodada_sub: 'lucro em BRL pelo câmbio de cada rodada', th_rodada: 'Rodada', th_status: 'Status', th_acum: 'Acumulado', h_lado: 'Por aposta', th_lado: 'Aposta', th_bverdes: 'Bilhetes verdes', export: '⬇ Exportar CSV',
    nova_rodada: 'Nova rodada', f_data: 'Data da rodada', f_nome: 'Nome', ph_nome_rodada: 'ex. Rodada 02/10 — Dois Lados', f_conta: 'Conta (de quem é a banca)', ph_conta: 'ex. Gabriel', f_cambio: 'Câmbio BRL→ARS no dia', ph_cambio: 'deixe vazio pra usar o atual',
    f_s2: 'Stake dupla (ARS)', f_s3: 'Stake tripla', f_s4: 'Stake quádrupla', f_apostas: 'Apostas do dia (uma por linha)', f_notas: 'Notas', ph_notas: 'contexto, casa de aposta, etc.', criar: 'Criar rodada',
    nova_hint: 'Depois de criar, lance o apostado/fechamento de cada aposta na aba Rodadas, ou os bilhetes um a um. Stake 0 desliga aquele tipo de combinação.', rodada_criada: 'rodada criada',
    conf: 'Configuração', f_cambio_manual: 'Câmbio manual BRL→ARS (vazio = automático AwesomeAPI)', automatico: 'automático', auto_agora: 'Automático agora', erro: 'erro',
    conf_hint: 'O câmbio de cada rodada fica congelado no dia; o manual só vale pra rodadas sem câmbio próprio e pros totais.', f_ds2: 'Stake padrão dupla', f_ds3: 'Stake padrão tripla', f_ds4: 'Stake padrão quádrupla',
    conf_salva: 'config salva', refresh_fx: '↻ Atualizar cotação', fx_ok: 'cotação atualizada', falha: 'falha ao carregar', idioma: 'Idioma', ro_msg: 'versão pública somente leitura', ro_badge: 'somente leitura',
  },
  es: {
    locale: 'es-AR', updated: 'actualizado', fx_na: 'cotización no disponible', manual: 'manual',
    nav_rodadas: 'Jornadas', nav_resumo: 'Resumen', nav_nova: '+ Jornada', nav_conf: 'Config',
    t_investido: 'Invertido', t_retorno: 'Retorno', t_lucro: 'Ganancia', t_roi: 'ROI', t_jogos: 'Partidos', t_rodadas: 'Jornadas', t_verdes: 'Boletos ganados',
    rodada: 'jornada', rodadas: 'jornadas', pendente: 'pendiente', pendentes: 'pendientes', acerto: 'acierto', aberta: 'abierta', abertas: 'abiertas', das_comb: 'de las combinaciones',
    empty_rodadas: 'Todavía no hay jornadas. Hacé clic en <b>+ Jornada</b> para crear la primera.', sem_rodadas: 'Sin jornadas.',
    st_aberto: 'abierta', st_fechado: 'cerrada', st_vazio: 'vacía', l_fechado: 'cerrada', l_aberto: 'abierta', l_vazio: 'sin cargar',
    max: 'máx.', cambio: 'cambio', cambio_rodada: 'cambio de la jornada', atual: 'actual', add_aposta: '+ apuesta', renomear: 'renombrar', remover: 'eliminar', remover_lado: 'eliminar apuesta', editar: 'editar',
    em_aberto: 'abierta', apostado: 'apostado', aguardando: 'esperando cierre', apostado_ars: 'Apostado (ARS)', fechamento_ars: 'Cierre (ARS)', conta: 'Cuenta', salvar: 'Guardar',
    lancar_bilhetes: 'Cargar boletos individuales (combinadas automáticas)', ph_jogo: 'Partido (ej. Monaco x Lens)', ph_pernas: 'Selecciones', ph_pernas_long: 'Selecciones (ej. Monaco gana + Lens +5.5 córners + +13.5 remates)', add_jogo: '+ partido',
    sem_nome: 'sin nombre', inv: 'inv', ret: 'ret', lucro: 'ganancia', sobrescrever: 'sobrescribir total apostado / cierre', totais_manuais: 'totales manuales', fechou_com: 'cerró con',
    th_jogo: 'Partido / boleto', th_odd: 'Cuota', th_resultado: 'Resultado', stake_por: 'stake por boleto', defina_stakes: 'definí los stakes',
    combinacoes: 'combinaciones', verdes: 'ganadas', vermelhas: 'perdidas', max_restante: 'máx. restante', bilhete_verde: 'boleto ganado', bilhetes_verdes: 'boletos ganados',
    k1: 'Simples', k2: 'Dobles', k3: 'Triples', k4: 'Cuádruples', k5: 'Quíntuples', k6: 'Séxtuples', k1s: 'Simple', k2s: 'Doble', k3s: 'Triple', k4s: 'Cuádruple', k5s: 'Quíntuple', k6s: 'Séxtuple',
    s_pendente: 'Pendiente', s_green: 'Ganada', s_red: 'Perdida', s_void: 'Anulada',
    c_remover_jogo: '¿Eliminar este partido?', p_jogo: 'Partido:', p_pernas: 'Selecciones / descripción:', p_odd: 'Cuota:', jogo_add: 'partido agregado', p_nome_aposta: 'Nombre de la apuesta:', aposta: 'Apuesta',
    lanc_salvo: 'carga guardada', p_total_apostado: 'Total apostado (ARS) — vacío = calcular por los boletos:', p_total_ret: 'Total devuelto / cierre (ARS) — vacío = abierta:', p_conta: 'Cuenta:',
    c_remover_lado: '¿Eliminar la apuesta entera con todos los partidos?', c_apagar_rodada: '¿Borrar la jornada {id} entera?', p_nome_rodada: 'Nombre de la jornada:', p_cambio_rodada: 'Cambio BRL→ARS de la jornada (vacío = usa el actual):', p_conta_banca: 'Cuenta (de quién es la banca):', p_notas: 'Notas:',
    h_conta: 'Por cuenta', th_conta: 'Cuenta', th_fechadas: 'Apuestas cerradas', th_lucro_ars: 'Ganancia ARS', th_lucro_brl: 'Ganancia BRL', h_rodada: 'Por jornada', h_rodada_sub: 'ganancia en BRL al cambio de cada jornada', th_rodada: 'Jornada', th_status: 'Estado', th_acum: 'Acumulado', h_lado: 'Por apuesta', th_lado: 'Apuesta', th_bverdes: 'Boletos ganados', export: '⬇ Exportar CSV',
    nova_rodada: 'Nueva jornada', f_data: 'Fecha de la jornada', f_nome: 'Nombre', ph_nome_rodada: 'ej. Jornada 02/10 — Dos Lados', f_conta: 'Cuenta (de quién es la banca)', ph_conta: 'ej. Gabriel', f_cambio: 'Cambio BRL→ARS del día', ph_cambio: 'dejá vacío para usar el actual',
    f_s2: 'Stake doble (ARS)', f_s3: 'Stake triple', f_s4: 'Stake cuádruple', f_apostas: 'Apuestas del día (una por línea)', f_notas: 'Notas', ph_notas: 'contexto, casa de apuestas, etc.', criar: 'Crear jornada',
    nova_hint: 'Después de crear, cargá el apostado/cierre de cada apuesta en la pestaña Jornadas, o los boletos uno por uno. Stake 0 apaga ese tipo de combinación.', rodada_criada: 'jornada creada',
    conf: 'Configuración', f_cambio_manual: 'Cambio manual BRL→ARS (vacío = automático AwesomeAPI)', automatico: 'automático', auto_agora: 'Automático ahora', erro: 'error',
    conf_hint: 'El cambio de cada jornada queda congelado en el día; el manual solo vale para jornadas sin cambio propio y para los totales.', f_ds2: 'Stake por defecto doble', f_ds3: 'Stake por defecto triple', f_ds4: 'Stake por defecto cuádruple',
    conf_salva: 'config guardada', refresh_fx: '↻ Actualizar cotización', fx_ok: 'cotización actualizada', falha: 'error al cargar', idioma: 'Idioma', ro_msg: 'versión pública solo lectura', ro_badge: 'solo lectura',
  },
};
const t = (k, vars) => { let s = (I18N[lang] && I18N[lang][k]) ?? I18N.pt[k] ?? k; if (vars) for (const [a, b] of Object.entries(vars)) s = s.replace('{' + a + '}', b); return s; };
const LOC = () => I18N[lang].locale;

const fmtARS = v => v == null ? '—' : '$ ' + Number(v).toLocaleString(LOC(), {maximumFractionDigits: 0});
const fmtBRL = v => v == null ? '—' : 'R$ ' + Number(v).toLocaleString(LOC(), {minimumFractionDigits: 2, maximumFractionDigits: 2});
const fmtN = (v, d = 2) => Number(v).toLocaleString(LOC(), {maximumFractionDigits: d});
const sgn = v => v > 0 ? 'pos' : v < 0 ? 'neg' : '';
const pm = v => (v > 0 ? '+' : '') + fmtARS(v);
const brl = (ars, rate) => rate ? fmtBRL(ars / rate) : '—';
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dateBR = id => `${id.slice(8,10)}/${id.slice(5,7)}/${id.slice(0,4)}`;
const ST = {pendente: '⏳', green: '✅', red: '❌', void: '∅'};
const stName = s => t('s_' + s);
const tipoNome = (k, sing) => t('k' + k + (sing ? 's' : ''));
const plural = (n, one, many) => `${n} ${t(n === 1 ? one : many)}`;

function toast(m, err) { const el = $('#toast'); el.textContent = m; el.className = 'toast' + (err ? ' err' : ''); clearTimeout(el._h); el._h = setTimeout(() => el.classList.add('hidden'), 2500); }

async function api(method, path, body) {
  if (RO) { toast(t('ro_msg'), true); throw new Error('readonly'); }
  const r = await fetch(API(path), {method, headers: {'Content-Type': 'application/json'}, body: body == null ? undefined : JSON.stringify(body)});
  const j = await r.json().catch(() => ({}));
  if (!r.ok) { toast(j.error || (t('erro') + ' ' + r.status), true); throw new Error(j.error || r.status); }
  return j;
}

async function load() { D = RO ? window.__DATA__ : await (await fetch(API('data'))).json(); render(); }

function render() {
  document.body.classList.toggle('ro', RO);
  document.documentElement.lang = lang === 'es' ? 'es-AR' : 'pt-BR';
  $('#upd').textContent = (D.updated ? t('updated') + ' ' + D.updated : '') + (RO ? ' · ' + t('ro_badge') : '');
  document.querySelectorAll('nav button[data-v]').forEach(b => { b.textContent = t('nav_' + b.dataset.v); b.classList.toggle('on', b.dataset.v === view); });
  document.querySelectorAll('.lang button').forEach(b => b.classList.toggle('on', b.dataset.l === lang));
  renderFx(); renderTiles();
  document.querySelectorAll('main section[id^=v-]').forEach(s => s.classList.toggle('hidden', s.id !== 'v-' + view));
  ({rodadas: renderRodadas, resumo: renderResumo, nova: renderNova, conf: renderConf})[view]();
}

function renderFx() {
  const c = D.cambio, el = $('#fx');
  el.className = 'fx' + (c.manual ? ' manual' : '');
  const rate = c.bid;
  el.innerHTML = rate
    ? `<span>R$ 1 =</span><b>${fmtN(rate)} ARS</b>
       <span class="src">${c.manual ? t('manual') : esc(c.fonte || '')}${c.create_date && !c.manual ? ' · ' + c.create_date.slice(11,16) : ''}</span>
       <span class="src">· ${fmtN(1000, 0)} ARS = ${fmtBRL(1000 / rate)}</span>`
    : `<span class="warn">${t('fx_na')}</span>`;
}

function renderTiles() {
  const x = D.total, rate = D.cambio.bid;
  const tiles = [
    [t('t_investido'), fmtARS(x.investido), brl(x.investido, rate), ''],
    [t('t_retorno'), fmtARS(x.retorno), brl(x.retorno, rate), ''],
    [t('t_lucro'), pm(x.lucro), (x.lucro >= 0 ? '+' : '') + brl(x.lucro, rate), sgn(x.lucro)],
    [t('t_roi'), (x.roi > 0 ? '+' : '') + fmtN(x.roi, 1) + '%', plural(x.rodadas, 'rodada', 'rodadas'), sgn(x.roi)],
    [t('t_jogos'), `${x.green}✅ ${x.red}❌`, `${plural(x.pendente, 'pendente', 'pendentes')}${x.void ? ' · ' + x.void + ' void' : ''}${x.taxa_acerto != null ? ' · ' + fmtN(x.taxa_acerto, 1) + '% ' + t('acerto') : ''}`, ''],
    [t('t_rodadas'), `${x.rodadas_green}🟢 ${x.rodadas_red}🔴`, plural(x.rodadas_abertas, 'aberta', 'abertas'), ''],
    [t('t_verdes'), `${x.combos_green}/${x.combos_total}`, x.combos_total ? fmtN(100 * x.combos_green / x.combos_total, 1) + '% ' + t('das_comb') : '—', ''],
  ];
  $('#tiles').innerHTML = tiles.map(([l, v, s, c]) => `<div class="tile"><span>${l}</span><b class="${c}">${v}</b><small>${s}</small></div>`).join('');
}

/* ---------- rodadas ---------- */
function renderRodadas() {
  const el = $('#v-rodadas');
  if (!D.rodadas.length) { el.innerHTML = `<div class="empty">${t('empty_rodadas')}</div>`; return; }
  el.innerHTML = [...D.rodadas].reverse().map(r => rodadaHTML(r)).join('');
}

function rodadaHTML(r) {
  const rate = r.cambio;
  return `<div class="rodada" data-r="${r.id}">
    <div class="head">
      <h3>${esc(r.nome)} <span class="mut" style="font-weight:400;font-size:12px">${dateBR(r.id)}</span></h3>
      <span class="badge ${r.status}">${t('st_' + r.status)}</span>${r.conta ? `<span class="badge conta">👤 ${esc(r.conta)}</span>` : ''}
      <div class="kpis">
        <span>${t('t_investido')} <b>${fmtARS(r.investido)}</b></span>
        <span>${t('t_retorno')} <b>${fmtARS(r.retorno)}</b>${r.status === 'aberto' && r.retorno_potencial > r.retorno ? ` <span class="mut">(${t('max')} ${fmtARS(r.retorno_potencial)})</span>` : ''}</span>
        <span>${t('t_lucro')} <b class="${sgn(r.lucro)}">${pm(r.lucro)}</b> <span class="${sgn(r.lucro)}">${r.lucro_brl != null ? (r.lucro_brl >= 0 ? '+' : '') + fmtBRL(r.lucro_brl) : ''}</span></span>
        <span class="mut" title="${t('cambio_rodada')}">${t('cambio')} ${rate ? fmtN(rate) : '—'}${r.cambio_proprio ? '' : ' (' + t('atual') + ')'}</span>
      </div>
      <div class="right">
        <button class="btn small" onclick="addLado('${r.id}')">${t('add_aposta')}</button>
        <button class="btn small" onclick="editRodada('${r.id}')">✎</button>
        <button class="btn small danger" onclick="delRodada('${r.id}')">🗑</button>
      </div>
    </div>
    ${r.notas ? `<div class="notas">${esc(r.notas)}</div>` : ''}
    <div class="lados">${r.lados.map(l => ladoHTML(r, l)).join('')}</div>
  </div>`;
}

function ladoHTML(r, l) {
  const head = `<div class="lh"><h4>${esc(l.nome)}</h4><span class="badge ${l.status}">${t('l_' + l.status)}</span>${l.conta && l.conta !== r.conta ? `<span class="badge conta">👤 ${esc(l.conta)}</span>` : ''}
      <span class="num"><button class="x" title="${t('renomear')}" onclick="renameLado('${r.id}','${l.id}')">✎</button><button class="x" title="${t('remover_lado')}" onclick="delLado('${r.id}','${l.id}')">×</button></span></div>`;
  const addForm = long => `<form class="add" onsubmit="return addJogo(event,'${r.id}','${l.id}')">
      <input name="jogo" placeholder="${t('ph_jogo')}" required><input name="desc" placeholder="${t(long ? 'ph_pernas_long' : 'ph_pernas')}"><input name="odd" type="number" step="0.01" min="1" placeholder="${t('th_odd')}" required><button class="btn small primary">${t('add_jogo')}</button>
    </form>`;
  // ---- modo simples: sem bilhetes -> card de lancamento (apostado / fechamento) ----
  if (!l.n) {
    const lucroRow = l.manual ? `<div class="big ${sgn(l.lucro)}">${l.retorno_manual != null ? pm(l.lucro) : t('em_aberto')}</div>
        <div class="mut small">${l.retorno_manual != null ? `${l.lucro >= 0 ? '+' : ''}${brl(l.lucro, r.cambio)} · ROI ${fmtN(l.investido ? 100 * l.lucro / l.investido : 0, 1)}%` : `${t('apostado')} ${fmtARS(l.investido)} · ${t('aguardando')}`}</div>` : '';
    return `<div class="lado simples" data-l="${l.id}">${head}
      ${lucroRow}
      <form class="lanc" onsubmit="return salvarLanc(event,'${r.id}','${l.id}')">
        <label>${t('apostado_ars')}<input name="inv" type="number" step="any" inputmode="decimal" value="${l.investido_manual ?? ''}" placeholder="520000"></label>
        <label>${t('fechamento_ars')}<input name="ret" type="number" step="any" inputmode="decimal" value="${l.retorno_manual ?? ''}" placeholder="545220"></label>
        <label>${t('conta')}<input name="conta" value="${esc(l.conta || r.conta || '')}" placeholder="Gabriel"></label>
        <button class="btn primary">${t('salvar')}</button>
      </form>
      <details><summary>${t('lancar_bilhetes')}</summary>${addForm(false)}</details>
    </div>`;
  }
  // ---- modo bilhetes ----
  const rows = l.jogos.map(j => `<tr class="${j.status}">
      <td><span class="jogo">${esc(j.jogo) || `<i class="mut">${t('sem_nome')}</i>`}</span>${j.desc ? `<span class="desc">${esc(j.desc)}</span>` : ''}</td>
      <td class="num">${Number(j.odd).toFixed(2)}</td>
      <td class="num"><span class="st">${Object.keys(ST).map(s => `<button class="${s}${j.status === s ? ' on' : ''}" title="${stName(s)}" onclick="setStatus('${r.id}','${l.id}','${j.id}','${s}')">${ST[s]}</button>`).join('')}</span>
        <button class="x" title="${t('editar')}" onclick="editJogo('${r.id}','${l.id}','${j.id}')">✎</button><button class="x" title="${t('remover')}" onclick="delJogo('${r.id}','${l.id}','${j.id}')">×</button></td>
    </tr>`).join('');
  const tipos = l.tipos.map(x => `<div class="tipo"><span class="q">${tipoNome(x.k)} · ${x.qtd}× <input type="number" step="any" value="${x.stake}" title="${t('stake_por')}" onchange="setStake('${r.id}','${l.id}',${x.k},this.value)"></span>
      <b class="${sgn(x.lucro)}">${x.green > 0 || l.status === 'fechado' ? pm(x.lucro) : fmtARS(-x.investido)}</b>
      <span class="combos"><span class="g">${x.green}✅</span> <span class="r">${x.red}❌</span> ${x.pendente ? `<span class="p">${x.pendente}⏳</span>` : ''}</span></div>`).join('');
  const greens = l.tipos.flatMap(x => x.combos_green.map(c => `<li>${tipoNome(x.k, true)} ${c.jogos.map(id => esc((l.jogos.find(j => j.id === id) || {}).jogo || id).split(' x ')[0]).join(' + ')} @${c.odd} → <b>${fmtARS(c.retorno)}</b></li>`));
  return `<div class="lado" data-l="${l.id}">${head}
    <div class="kpis small"><span>${t('inv')} <b>${fmtARS(l.investido)}</b></span><span>${t('ret')} <b>${fmtARS(l.retorno)}</b></span><span>${t('lucro')} <b class="${sgn(l.lucro)}">${pm(l.lucro)}</b></span><button class="x" title="${t('sobrescrever')}" onclick="manualLado('${r.id}','${l.id}')">💰</button></div>
    ${l.manual ? `<div class="combos" style="margin:4px 0">💰 ${t('totais_manuais')}: ${t('apostado')} <b>${fmtARS(l.investido)}</b>${l.retorno_manual != null ? ` · ${t('fechou_com')} <b>${fmtARS(l.retorno)}</b>` : ''}</div>` : ''}
    <table><thead><tr><th>${t('th_jogo')}</th><th class="num">${t('th_odd')}</th><th class="num">${t('th_resultado')}</th></tr></thead><tbody>${rows}</tbody></table>
    ${addForm(true)}
    <div class="tipos">${tipos || `<span class="mut">${t('defina_stakes')}</span>`}</div>
    <div class="combos">${l.combos.total} ${t('combinacoes')}: <span class="g">${l.combos.green} ${t('verdes')}</span> · <span class="r">${l.combos.red} ${t('vermelhas')}</span> · <span class="p">${l.combos.pendente} ${t('pendentes')}</span>${l.status === 'aberto' ? ` · ${t('max_restante')} ${fmtARS(l.retorno_potencial)}` : ''}</div>
    ${greens.length ? `<details><summary>${plural(greens.length, 'bilhete_verde', 'bilhetes_verdes')}</summary><ul class="greens">${greens.join('')}</ul></details>` : ''}
  </div>`;
}

/* ---------- acoes ---------- */
const findLado = (r, l) => D.rodadas.find(x => x.id === r).lados.find(x => x.id === l);
window.setStatus = async (r, l, j, s) => { await api('PATCH', `rodada/${r}/lado/${l}/jogo/${j}`, {status: s}); await load(); };
window.delJogo = async (r, l, j) => { if (!confirm(t('c_remover_jogo'))) return; await api('DELETE', `rodada/${r}/lado/${l}/jogo/${j}`); await load(); };
window.editJogo = async (r, l, j) => {
  const jg = findLado(r, l).jogos.find(x => x.id === j);
  const jogo = prompt(t('p_jogo'), jg.jogo); if (jogo == null) return;
  const desc = prompt(t('p_pernas'), jg.desc); if (desc == null) return;
  const odd = prompt(t('p_odd'), jg.odd); if (odd == null) return;
  await api('PATCH', `rodada/${r}/lado/${l}/jogo/${j}`, {jogo, desc, odd}); await load();
};
window.addJogo = async (ev, r, l) => {
  ev.preventDefault(); const f = ev.target;
  await api('POST', `rodada/${r}/lado/${l}/jogo`, {jogo: f.jogo.value, desc: f.desc.value, odd: f.odd.value});
  f.reset(); await load(); toast(t('jogo_add')); return false;
};
window.setStake = async (r, l, k, v) => {
  const stakes = {...findLado(r, l).stakes, [k]: Number(v) || 0};
  await api('PUT', `rodada/${r}/lado/${l}`, {stakes}); await load();
};
window.addLado = async r => {
  const nome = prompt(t('p_nome_aposta'), t('aposta') + ' ' + (D.rodadas.find(x => x.id === r).lados.length + 1)); if (!nome) return;
  await api('POST', `rodada/${r}/lado`, {nome}); await load();
};
window.salvarLanc = async (ev, r, l) => {
  ev.preventDefault(); const f = ev.target;
  await api('PUT', `rodada/${r}/lado/${l}`, {investido_manual: f.inv.value || null, retorno_manual: f.ret.value || null, conta: f.conta.value});
  toast(t('lanc_salvo')); await load(); return false;
};
window.manualLado = async (r, l) => {
  const lado = findLado(r, l);
  const inv = prompt(t('p_total_apostado'), lado.investido_manual ?? ''); if (inv == null) return;
  const ret = prompt(t('p_total_ret'), lado.retorno_manual ?? ''); if (ret == null) return;
  const conta = prompt(t('p_conta'), lado.conta || ''); if (conta == null) return;
  await api('PUT', `rodada/${r}/lado/${l}`, {investido_manual: inv === '' ? null : inv, retorno_manual: ret === '' ? null : ret, conta}); await load();
};
window.renameLado = async (r, l) => {
  const nome = prompt(t('p_nome_aposta'), findLado(r, l).nome); if (!nome) return;
  await api('PUT', `rodada/${r}/lado/${l}`, {nome}); await load();
};
window.delLado = async (r, l) => { if (!confirm(t('c_remover_lado'))) return; await api('DELETE', `rodada/${r}/lado/${l}`); await load(); };
window.delRodada = async r => { if (!confirm(t('c_apagar_rodada', {id: r}))) return; await api('DELETE', `rodada/${r}`); await load(); };
window.editRodada = async r => {
  const rd = D.rodadas.find(x => x.id === r);
  const nome = prompt(t('p_nome_rodada'), rd.nome); if (nome == null) return;
  const cambio = prompt(t('p_cambio_rodada'), rd.cambio_proprio ? rd.cambio : ''); if (cambio == null) return;
  const conta = prompt(t('p_conta_banca'), rd.conta || ''); if (conta == null) return;
  const notas = prompt(t('p_notas'), rd.notas || ''); if (notas == null) return;
  await api('PATCH', `rodada/${r}`, {nome, cambio: cambio === '' ? null : cambio, conta, notas}); await load();
};
window.setLang = l => { lang = l; localStorage.setItem('desd_lang', l); render(); };

/* ---------- resumo ---------- */
function renderResumo() {
  const el = $('#v-resumo');
  if (!D.rodadas.length) { el.innerHTML = `<div class="empty">${t('sem_rodadas')}</div>`; return; }
  const maxAbs = Math.max(1, ...D.serie.map(s => Math.abs(s.acumulado)), ...D.serie.map(s => Math.abs(s.lucro)));
  const rows = D.rodadas.map((r, i) => {
    const s = D.serie[i];
    const w = Math.min(100, 100 * Math.abs(r.lucro) / maxAbs) / 2;
    return `<tr><td>${dateBR(r.id)} <span class="mut">${esc(r.nome)}</span></td><td><span class="badge ${r.status}">${t('st_' + r.status)}</span></td>
      <td class="num">${r.acertos.green}✅ ${r.acertos.red}❌ ${r.acertos.pendente ? r.acertos.pendente + '⏳' : ''}</td>
      <td class="num">${fmtARS(r.investido)}</td><td class="num">${fmtARS(r.retorno)}</td>
      <td class="num ${sgn(r.lucro)}">${pm(r.lucro)}</td><td class="num ${sgn(r.lucro)}">${r.lucro_brl != null ? fmtBRL(r.lucro_brl) : '—'}</td>
      <td style="min-width:140px"><div class="bar"><i class="${r.lucro < 0 ? 'neg' : ''}" style="left:${r.lucro < 0 ? 50 - w : 50}%;width:${w}%"></i></div></td>
      <td class="num ${sgn(s.acumulado)}">${pm(s.acumulado)}</td></tr>`;
  }).join('');
  const porLado = {};
  D.rodadas.forEach(r => r.lados.forEach(l => { const k = l.nome; porLado[k] = porLado[k] || {inv: 0, ret: 0, g: 0, r: 0, cg: 0, ct: 0}; const p = porLado[k];
    p.inv += l.investido; p.ret += l.retorno; p.g += l.acertos.green; p.r += l.acertos.red; p.cg += l.combos.green; p.ct += l.combos.total; }));
  const ladoRows = Object.entries(porLado).map(([k, p]) => `<tr><td>${esc(k)}</td><td class="num">${p.g}✅ ${p.r}❌</td><td class="num">${p.cg}/${p.ct}</td><td class="num">${fmtARS(p.inv)}</td><td class="num">${fmtARS(p.ret)}</td><td class="num ${sgn(p.ret - p.inv)}">${pm(p.ret - p.inv)}</td><td class="num ${sgn(p.ret - p.inv)}">${p.inv ? fmtN((p.ret - p.inv) / p.inv * 100, 1) + '%' : '—'}</td></tr>`).join('');
  const contaRows = Object.entries(D.contas || {}).map(([k, c]) => `<tr><td>👤 ${esc(k)}</td><td class="num">${c.fechados}/${c.lados}</td><td class="num">${fmtARS(c.investido)}</td><td class="num">${fmtARS(c.retorno)}</td><td class="num ${sgn(c.lucro)}">${pm(c.lucro)}</td><td class="num ${sgn(c.lucro)}">${(c.lucro_brl >= 0 ? '+' : '') + fmtBRL(c.lucro_brl)}</td><td class="num ${sgn(c.lucro)}">${c.investido ? fmtN(c.lucro / c.investido * 100, 1) + '%' : '—'}</td></tr>`).join('');
  el.innerHTML = `<h2>${t('h_conta')}</h2>
    <table><thead><tr><th>${t('th_conta')}</th><th class="num">${t('th_fechadas')}</th><th class="num">${t('t_investido')}</th><th class="num">${t('t_retorno')}</th><th class="num">${t('th_lucro_ars')}</th><th class="num">${t('th_lucro_brl')}</th><th class="num">ROI</th></tr></thead><tbody>${contaRows}</tbody></table>
    <h2>${t('h_rodada')} <span class="mut" style="text-transform:none;letter-spacing:0">${t('h_rodada_sub')}</span></h2>
    <table><thead><tr><th>${t('th_rodada')}</th><th>${t('th_status')}</th><th class="num">${t('t_jogos')}</th><th class="num">${t('t_investido')}</th><th class="num">${t('t_retorno')}</th><th class="num">${t('th_lucro_ars')}</th><th class="num">${t('th_lucro_brl')}</th><th></th><th class="num">${t('th_acum')}</th></tr></thead><tbody>${rows}</tbody></table>
    <h2>${t('h_lado')}</h2>
    <table><thead><tr><th>${t('th_lado')}</th><th class="num">${t('t_jogos')}</th><th class="num">${t('th_bverdes')}</th><th class="num">${t('t_investido')}</th><th class="num">${t('t_retorno')}</th><th class="num">${t('t_lucro')}</th><th class="num">ROI</th></tr></thead><tbody>${ladoRows}</tbody></table>
    ${RO ? '' : `<div class="row"><a class="btn" href="${API('export.csv')}" download>${t('export')}</a></div>`}`;
}

/* ---------- nova rodada ---------- */
function renderNova() {
  const hoje = new Date(); const ontem = new Date(hoje - 864e5);
  const def = D.stakes_default;
  const contaDef = (D.rodadas.length ? D.rodadas[D.rodadas.length - 1].conta : '') || '';
  $('#v-nova').innerHTML = `<form class="form" onsubmit="return novaRodada(event)">
    <h2 style="margin:0">${t('nova_rodada')}</h2>
    <label>${t('f_data')} <input name="id" type="date" value="${ontem.toISOString().slice(0,10)}" required></label>
    <label>${t('f_nome')} <input name="nome" placeholder="${t('ph_nome_rodada')}"></label>
    <label>${t('f_conta')} <input name="conta" value="${esc(contaDef)}" placeholder="${t('ph_conta')}"></label>
    <label>${t('f_cambio')} <input name="cambio" type="number" step="any" value="${D.cambio.bid || ''}" placeholder="${t('ph_cambio')}"></label>
    <div class="row">
      <label style="flex:1">${t('f_s2')} <input name="s2" type="number" step="any" value="${def['2'] ?? ''}"></label>
      <label style="flex:1">${t('f_s3')} <input name="s3" type="number" step="any" value="${def['3'] ?? ''}"></label>
      <label style="flex:1">${t('f_s4')} <input name="s4" type="number" step="any" value="${def['4'] ?? ''}"></label>
    </div>
    <label>${t('f_apostas')} <textarea name="lados">${t('aposta')} 1\n${t('aposta')} 2</textarea></label>
    <label>${t('f_notas')} <textarea name="notas" placeholder="${t('ph_notas')}"></textarea></label>
    <button class="btn primary">${t('criar')}</button>
    <small class="mut">${t('nova_hint')}</small>
  </form>`;
}
window.novaRodada = async ev => {
  ev.preventDefault(); const f = ev.target;
  const stakes = {2: Number(f.s2.value) || 0, 3: Number(f.s3.value) || 0, 4: Number(f.s4.value) || 0};
  const lados = f.lados.value.split('\n').map(s => s.trim()).filter(Boolean).map((nome, i) => ({id: 'L' + (i + 1), nome, stakes}));
  await api('POST', 'rodada', {id: f.id.value, nome: f.nome.value || undefined, cambio: f.cambio.value || undefined, conta: f.conta.value, notas: f.notas.value, lados});
  toast(t('rodada_criada')); view = 'rodadas'; await load(); return false;
};

/* ---------- config ---------- */
function renderConf() {
  const c = D.config, def = D.stakes_default, fx = D.cambio;
  $('#v-conf').innerHTML = `<form class="form" onsubmit="return saveConf(event)">
    <h2 style="margin:0">${t('conf')}</h2>
    <label>${t('idioma')} <span class="lang"><button type="button" class="btn small${lang === 'pt' ? ' on' : ''}" onclick="setLang('pt')">🇧🇷 Português</button> <button type="button" class="btn small${lang === 'es' ? ' on' : ''}" onclick="setLang('es')">🇦🇷 Español</button></span></label>
    <label>${t('f_cambio_manual')} <input name="cambio_manual" type="number" step="any" value="${c.cambio_manual ?? ''}" placeholder="${t('automatico')}: ${fx.auto ?? '—'}"></label>
    <div class="mut" style="font-size:12px">${t('auto_agora')}: <b>${fx.auto ?? '—'}</b> (${esc(fx.fonte || '')}${fx.create_date ? ', ' + fx.create_date : ''}${fx.erro ? ' · ' + t('erro') + ': ' + esc(fx.erro) : ''}). ${t('conf_hint')}</div>
    <div class="row">
      <label style="flex:1">${t('f_ds2')} <input name="s2" type="number" step="any" value="${def['2'] ?? ''}"></label>
      <label style="flex:1">${t('f_ds3')} <input name="s3" type="number" step="any" value="${def['3'] ?? ''}"></label>
      <label style="flex:1">${t('f_ds4')} <input name="s4" type="number" step="any" value="${def['4'] ?? ''}"></label>
    </div>
    <div class="row"><button class="btn primary">${t('salvar')}</button><button type="button" class="btn" onclick="refreshFx()">${t('refresh_fx')}</button></div>
  </form>`;
}
window.saveConf = async ev => {
  ev.preventDefault(); const f = ev.target;
  await api('PUT', 'config', {cambio_manual: f.cambio_manual.value || null, stakes_default: {2: Number(f.s2.value) || 0, 3: Number(f.s3.value) || 0, 4: Number(f.s4.value) || 0}});
  toast(t('conf_salva')); await load(); return false;
};
window.refreshFx = async () => { await fetch(API('cambio?force=1')); await load(); toast(t('fx_ok')); };

document.querySelectorAll('nav button[data-v]').forEach(b => b.onclick = () => { view = b.dataset.v; render(); });
load().catch(e => toast(t('falha') + ': ' + e.message, true));
setInterval(() => { if (view === 'rodadas' || view === 'resumo') load().catch(() => {}); }, 120000);
