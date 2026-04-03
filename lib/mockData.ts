export type StatutGlobal = "Actif" | "En cours" | "Attention" | "Erreur" | "Suspendu";

export type Agence = {
  id: string;
  nom: string;
  imageUrl: string;
  proprietaire: string;
  region: string;
  abonnement: "Standard" | "Pro" | "Entreprise";
  employes: number;
  locationsActives: number;
  transactionsTotal: number;
  statut: StatutGlobal;
  conformiteLoi25: "Conforme" | "En révision" | "Infraction";
  derniereActivite: string;
  scoreConformite: number;
  consentementClient: boolean;
  cbChiffree: boolean;
  pieceIdMasquee: boolean;
  logsAccesActifs: boolean;
};

export type Utilisateur = {
  id: string;
  nomComplet: string;
  role: "Admin Agence" | "Agent" | "Chauffeur" | "Secrétaire";
  agence: string;
  statut: "Actif" | "En cours" | "Suspendu";
  derniereConnexion: string;
  consentementEnregistre: boolean;
};

export type Transaction = {
  id: string;
  agence: string;
  vehicule: string;
  agent: string;
  client: string;
  debut: string;
  fin: string;
  montant: number;
  caution: number;
  dommage: boolean;
  contravention: "Aucune" | "Stationnement" | "Vitesse";
  statut: "Validée" | "En cours" | "Signalée" | "Annulée";
  horodatage: string;
};

export type ApiAlerte = {
  horodatage: string;
  type: "Timeout" | "Auth" | "Rate Limit" | "Erreur serveur";
  agence: string;
  severite: "Actif" | "En cours" | "Attention" | "Erreur";
  message: string;
};

export const agences: Agence[] = [
  {
    id: "AG-001",
    nom: "Agence Atlas Montréal",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=120&q=60",
    proprietaire: "Nadia Bensalem",
    region: "Montréal",
    abonnement: "Entreprise",
    employes: 42,
    locationsActives: 67,
    transactionsTotal: 6842,
    statut: "Actif",
    conformiteLoi25: "Conforme",
    derniereActivite: "Il y a 4 min",
    scoreConformite: 96,
    consentementClient: true,
    cbChiffree: true,
    pieceIdMasquee: true,
    logsAccesActifs: true,
  },
  {
    id: "AG-002",
    nom: "FleetPro Québec",
    imageUrl: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=120&q=60",
    proprietaire: "Julien Fortin",
    region: "Québec",
    abonnement: "Pro",
    employes: 31,
    locationsActives: 43,
    transactionsTotal: 5180,
    statut: "Actif",
    conformiteLoi25: "Conforme",
    derniereActivite: "Il y a 9 min",
    scoreConformite: 92,
    consentementClient: true,
    cbChiffree: true,
    pieceIdMasquee: true,
    logsAccesActifs: true,
  },
  {
    id: "AG-003",
    nom: "Location VTC Nord",
    imageUrl: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=120&q=60",
    proprietaire: "Karim El Idrissi",
    region: "Saguenay",
    abonnement: "Standard",
    employes: 18,
    locationsActives: 24,
    transactionsTotal: 2398,
    statut: "En cours",
    conformiteLoi25: "En révision",
    derniereActivite: "Il y a 16 min",
    scoreConformite: 81,
    consentementClient: true,
    cbChiffree: true,
    pieceIdMasquee: false,
    logsAccesActifs: true,
  },
  {
    id: "AG-004",
    nom: "AutoElite Laval",
    imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=120&q=60",
    proprietaire: "Sophie Martel",
    region: "Laval",
    abonnement: "Pro",
    employes: 27,
    locationsActives: 39,
    transactionsTotal: 4204,
    statut: "Actif",
    conformiteLoi25: "Conforme",
    derniereActivite: "Il y a 2 min",
    scoreConformite: 90,
    consentementClient: true,
    cbChiffree: true,
    pieceIdMasquee: true,
    logsAccesActifs: true,
  },
  {
    id: "AG-005",
    nom: "DriveOne Rive-Sud",
    imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=120&q=60",
    proprietaire: "Mathieu Côté",
    region: "Longueuil",
    abonnement: "Standard",
    employes: 16,
    locationsActives: 19,
    transactionsTotal: 1880,
    statut: "Attention",
    conformiteLoi25: "En révision",
    derniereActivite: "Il y a 34 min",
    scoreConformite: 77,
    consentementClient: true,
    cbChiffree: false,
    pieceIdMasquee: true,
    logsAccesActifs: true,
  },
  {
    id: "AG-006",
    nom: "MobiRent Sherbrooke",
    imageUrl: "https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9?auto=format&fit=crop&w=120&q=60",
    proprietaire: "Camille Roy",
    region: "Estrie",
    abonnement: "Pro",
    employes: 22,
    locationsActives: 26,
    transactionsTotal: 3014,
    statut: "Actif",
    conformiteLoi25: "Conforme",
    derniereActivite: "Il y a 11 min",
    scoreConformite: 89,
    consentementClient: true,
    cbChiffree: true,
    pieceIdMasquee: true,
    logsAccesActifs: true,
  },
  {
    id: "AG-007",
    nom: "NovaCar Gatineau",
    imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=120&q=60",
    proprietaire: "Hugo Lambert",
    region: "Outaouais",
    abonnement: "Entreprise",
    employes: 36,
    locationsActives: 55,
    transactionsTotal: 5906,
    statut: "Actif",
    conformiteLoi25: "Conforme",
    derniereActivite: "Il y a 5 min",
    scoreConformite: 94,
    consentementClient: true,
    cbChiffree: true,
    pieceIdMasquee: true,
    logsAccesActifs: true,
  },
  {
    id: "AG-008",
    nom: "UrbanDrive Trois-Rivières",
    imageUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=120&q=60",
    proprietaire: "Myriam Lavoie",
    region: "Mauricie",
    abonnement: "Standard",
    employes: 14,
    locationsActives: 17,
    transactionsTotal: 1624,
    statut: "Suspendu",
    conformiteLoi25: "Infraction",
    derniereActivite: "Il y a 2 h",
    scoreConformite: 63,
    consentementClient: false,
    cbChiffree: false,
    pieceIdMasquee: false,
    logsAccesActifs: false,
  },
  {
    id: "AG-009",
    nom: "Rent&Go Lévis",
    imageUrl: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?auto=format&fit=crop&w=120&q=60",
    proprietaire: "Yanis Tremblay",
    region: "Chaudière-Appalaches",
    abonnement: "Pro",
    employes: 25,
    locationsActives: 34,
    transactionsTotal: 3470,
    statut: "En cours",
    conformiteLoi25: "En révision",
    derniereActivite: "Il y a 23 min",
    scoreConformite: 83,
    consentementClient: true,
    cbChiffree: true,
    pieceIdMasquee: false,
    logsAccesActifs: true,
  },
  {
    id: "AG-010",
    nom: "PrimeFleet Centre-Ville",
    imageUrl: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=120&q=60",
    proprietaire: "Élodie Gagnon",
    region: "Montréal",
    abonnement: "Entreprise",
    employes: 48,
    locationsActives: 72,
    transactionsTotal: 7312,
    statut: "Actif",
    conformiteLoi25: "Conforme",
    derniereActivite: "À l'instant",
    scoreConformite: 98,
    consentementClient: true,
    cbChiffree: true,
    pieceIdMasquee: true,
    logsAccesActifs: true,
  },
];

export const utilisateurs: Utilisateur[] = [
  { id: "U-001", nomComplet: "Amine Haddad", role: "Admin Agence", agence: "Agence Atlas Montréal", statut: "Actif", derniereConnexion: "Aujourd'hui 09:43", consentementEnregistre: true },
  { id: "U-002", nomComplet: "Sara Mounir", role: "Agent", agence: "FleetPro Québec", statut: "Actif", derniereConnexion: "Aujourd'hui 08:15", consentementEnregistre: true },
  { id: "U-003", nomComplet: "Mélanie St-Pierre", role: "Secrétaire", agence: "AutoElite Laval", statut: "Actif", derniereConnexion: "Hier 18:21", consentementEnregistre: true },
  { id: "U-004", nomComplet: "Bilal Othman", role: "Chauffeur", agence: "NovaCar Gatineau", statut: "En cours", derniereConnexion: "Aujourd'hui 10:02", consentementEnregistre: true },
  { id: "U-005", nomComplet: "Rachid Benali", role: "Agent", agence: "Location VTC Nord", statut: "En cours", derniereConnexion: "Aujourd'hui 07:58", consentementEnregistre: true },
  { id: "U-006", nomComplet: "Naïma Chouinard", role: "Admin Agence", agence: "PrimeFleet Centre-Ville", statut: "Actif", derniereConnexion: "Aujourd'hui 10:18", consentementEnregistre: true },
  { id: "U-007", nomComplet: "Félix Dufresne", role: "Chauffeur", agence: "MobiRent Sherbrooke", statut: "Actif", derniereConnexion: "Hier 21:05", consentementEnregistre: true },
  { id: "U-008", nomComplet: "Samia Rahmani", role: "Agent", agence: "DriveOne Rive-Sud", statut: "Suspendu", derniereConnexion: "Il y a 3 jours", consentementEnregistre: false },
  { id: "U-009", nomComplet: "Ismaël Bouchard", role: "Secrétaire", agence: "Rent&Go Lévis", statut: "Actif", derniereConnexion: "Aujourd'hui 09:11", consentementEnregistre: true },
  { id: "U-010", nomComplet: "Yara Lemaire", role: "Agent", agence: "Agence Atlas Montréal", statut: "Actif", derniereConnexion: "Aujourd'hui 10:24", consentementEnregistre: true },
  { id: "U-011", nomComplet: "Loïc Bergeron", role: "Chauffeur", agence: "FleetPro Québec", statut: "Actif", derniereConnexion: "Aujourd'hui 06:49", consentementEnregistre: true },
  { id: "U-012", nomComplet: "Clara Nguyen", role: "Admin Agence", agence: "AutoElite Laval", statut: "Actif", derniereConnexion: "Aujourd'hui 08:57", consentementEnregistre: true },
];

export const transactions: Transaction[] = [
  { id: "TRX-9012", agence: "PrimeFleet Centre-Ville", vehicule: "Tesla Model Y", agent: "Naïma Chouinard", client: "Vincent Leblanc", debut: "02/04 09:15", fin: "04/04 09:15", montant: 420, caution: 800, dommage: false, contravention: "Aucune", statut: "Validée", horodatage: "10:22" },
  { id: "TRX-9013", agence: "FleetPro Québec", vehicule: "Toyota RAV4", agent: "Sara Mounir", client: "Mounia Fadel", debut: "03/04 08:00", fin: "05/04 20:00", montant: 310, caution: 500, dommage: false, contravention: "Aucune", statut: "En cours", horodatage: "10:18" },
  { id: "TRX-9014", agence: "DriveOne Rive-Sud", vehicule: "BMW X1", agent: "Samia Rahmani", client: "Hakim Azizi", debut: "03/04 07:40", fin: "04/04 19:00", montant: 280, caution: 600, dommage: true, contravention: "Stationnement", statut: "Signalée", horodatage: "10:14" },
  { id: "TRX-9015", agence: "Agence Atlas Montréal", vehicule: "Hyundai Kona", agent: "Yara Lemaire", client: "Karine Morin", debut: "03/04 09:00", fin: "03/04 22:00", montant: 145, caution: 300, dommage: false, contravention: "Aucune", statut: "Validée", horodatage: "10:09" },
  { id: "TRX-9016", agence: "Location VTC Nord", vehicule: "Audi A3", agent: "Rachid Benali", client: "Rym Chaoui", debut: "03/04 06:30", fin: "03/04 18:00", montant: 195, caution: 350, dommage: false, contravention: "Vitesse", statut: "Signalée", horodatage: "10:01" },
  { id: "TRX-9017", agence: "AutoElite Laval", vehicule: "Kia Sportage", agent: "Clara Nguyen", client: "Nicolas Brière", debut: "03/04 08:20", fin: "04/04 08:20", montant: 205, caution: 400, dommage: false, contravention: "Aucune", statut: "En cours", horodatage: "09:56" },
  { id: "TRX-9018", agence: "MobiRent Sherbrooke", vehicule: "Mazda CX-5", agent: "Félix Dufresne", client: "Anna Gosselin", debut: "03/04 07:15", fin: "05/04 07:15", montant: 330, caution: 500, dommage: false, contravention: "Aucune", statut: "Validée", horodatage: "09:49" },
  { id: "TRX-9019", agence: "NovaCar Gatineau", vehicule: "Ford Escape", agent: "Bilal Othman", client: "Imane Saidi", debut: "03/04 09:45", fin: "03/04 23:00", montant: 178, caution: 300, dommage: true, contravention: "Aucune", statut: "En cours", horodatage: "09:43" },
  { id: "TRX-9020", agence: "UrbanDrive Trois-Rivières", vehicule: "Nissan Rogue", agent: "Mélanie St-Pierre", client: "Éric Vallée", debut: "03/04 05:50", fin: "03/04 17:30", montant: 160, caution: 300, dommage: true, contravention: "Vitesse", statut: "Annulée", horodatage: "09:37" },
  { id: "TRX-9021", agence: "Rent&Go Lévis", vehicule: "Volkswagen Tiguan", agent: "Ismaël Bouchard", client: "Mélissa Perreault", debut: "03/04 08:40", fin: "04/04 08:40", montant: 214, caution: 350, dommage: false, contravention: "Aucune", statut: "Validée", horodatage: "09:30" },
];

export const kpis = {
  topbar: {
    agences: 248,
    utilisateursActifs: 1340,
    transactionsAujourdhui: 3892,
    appelsApi1h: 54210,
    systeme: "Système opérationnel",
  },
  vueEnsemble: {
    agencesEnregistrees: { valeur: 248, variation: "+12 ce mois", trend: "+5.2%" },
    utilisateursTotaux: { valeur: 4830, variation: "+320 ce mois", trend: "+7.1%" },
    revenusPlateforme: { valeur: 184200, variation: "↑ 23%", trend: "+23%" },
    transactionsSignalees: { valeur: 17, variation: "Dossiers prioritaires", trend: "-2%" },
  },
  transactions: {
    aujourdHui: 3892,
    valeurTotale: 482300,
    signalees: 41,
    dommages: 19,
  },
  api: {
    appelsAujourdhui: 54210,
    tauxErreur: 0.3,
    tempsReponseMs: 142,
    endpointsActifs: 38,
  },
};

export const transactionsQuotidiennes30j = [
  120, 145, 132, 156, 172, 180, 164, 171, 194, 201,
  188, 210, 206, 214, 228, 235, 221, 243, 248, 260,
  252, 266, 274, 268, 281, 296, 288, 304, 318, 326,
];

export const repartitionRoles = [
  { role: "Admin Agence", valeur: 14, couleur: "#3EC9F0" },
  { role: "Agent", valeur: 52, couleur: "#00E5A0" },
  { role: "Chauffeur", valeur: 23, couleur: "#F0A500" },
  { role: "Secrétaire", valeur: 11, couleur: "#F05A28" },
];

export const activiteRecente = [
  { agence: "Agence Atlas Montréal", action: "Paiement de location validé", montant: 420, heure: "10:22", statut: "Actif" as StatutGlobal },
  { agence: "DriveOne Rive-Sud", action: "Transaction marquée pour dommage", montant: 280, heure: "10:14", statut: "Attention" as StatutGlobal },
  { agence: "FleetPro Québec", action: "Nouveau client enregistré", montant: 0, heure: "10:09", statut: "En cours" as StatutGlobal },
  { agence: "Location VTC Nord", action: "Contravention signalée", montant: 195, heure: "10:01", statut: "Erreur" as StatutGlobal },
  { agence: "PrimeFleet Centre-Ville", action: "Abonnement Entreprise renouvelé", montant: 1200, heure: "09:54", statut: "Actif" as StatutGlobal },
  { agence: "AutoElite Laval", action: "Demande d'accès RGPD traitée", montant: 0, heure: "09:48", statut: "En cours" as StatutGlobal },
  { agence: "NovaCar Gatineau", action: "Remboursement client partiel", montant: 80, heure: "09:42", statut: "Attention" as StatutGlobal },
  { agence: "Rent&Go Lévis", action: "Export comptable généré", montant: 0, heure: "09:36", statut: "Actif" as StatutGlobal },
];

export const volumeApi7j = [5800, 6420, 7010, 7880, 8420, 9130, 9550];

export const topAgencesApi = [
  { agence: "PrimeFleet Centre-Ville", volume: 9840 },
  { agence: "Agence Atlas Montréal", volume: 9120 },
  { agence: "FleetPro Québec", volume: 8640 },
  { agence: "NovaCar Gatineau", volume: 7900 },
  { agence: "AutoElite Laval", volume: 7520 },
  { agence: "MobiRent Sherbrooke", volume: 6310 },
  { agence: "Location VTC Nord", volume: 5980 },
  { agence: "DriveOne Rive-Sud", volume: 5500 },
  { agence: "Rent&Go Lévis", volume: 5240 },
  { agence: "UrbanDrive Trois-Rivières", volume: 4100 },
];

export const apiAlertes: ApiAlerte[] = [
  { horodatage: "2026-04-03 10:20:11", type: "Timeout", agence: "FleetPro Québec", severite: "Attention", message: "Délai dépassé sur /reservations/create" },
  { horodatage: "2026-04-03 10:18:29", type: "Rate Limit", agence: "PrimeFleet Centre-Ville", severite: "En cours", message: "Pic d'appels sur endpoint /clients/search" },
  { horodatage: "2026-04-03 10:11:02", type: "Auth", agence: "UrbanDrive Trois-Rivières", severite: "Erreur", message: "Jeton API expiré pour un compte agent" },
  { horodatage: "2026-04-03 09:58:44", type: "Erreur serveur", agence: "Location VTC Nord", severite: "Erreur", message: "Réponse 500 sur /transactions/sync" },
  { horodatage: "2026-04-03 09:52:10", type: "Timeout", agence: "Agence Atlas Montréal", severite: "Attention", message: "Latence élevée depuis la région Est" },
];

export const conformiteSynthese = {
  scoreGlobal: 87,
  conformes: 7,
  enRevision: 2,
  infraction: 1,
};
