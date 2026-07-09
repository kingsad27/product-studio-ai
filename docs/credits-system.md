# Système de Crédits — Product Studio AI

> Document de référence pour le modèle économique basé sur les crédits.

---

## 1. Principe fondamental

Le modèle de Product Studio AI repose sur un système de **crédits prépayés** :

> **1 crédit = 1 image professionnelle générée**

Ce modèle a été choisi parce qu'il est :
- **Simple à comprendre** pour des utilisateurs non-techniques
- **Flexible** (pas d'abonnement mensuel contraignant)
- **Adapté aux usages irréguliers** (vendeurs qui ont des pics d'activité)
- **Accessible** avec une barrière d'entrée très basse (1 000 FCFA)

---

## 2. Règle d'or : les crédits n'expirent jamais

Les crédits achetés sont **valables à vie**, sans date d'expiration.

### Justification :
- Respecte le pouvoir d'achat limité des utilisateurs cibles
- Réduit l'anxiété à l'achat ("j'ai le temps d'utiliser mes crédits")
- Fidélise sans pression inutile
- Différenciateur positif face à des concurrents avec abonnements

---

## 3. Packs de crédits disponibles

| Pack        | Crédits | Prix FCFA | Prix USD (~) | Prix / image |
|-------------|---------|-----------|--------------|--------------|
| Découverte  | 5       | 1 000     | ~1,60 $      | 200 FCFA     |
| Starter     | 15      | 2 500     | ~4,00 $      | 167 FCFA     |
| Business ⭐  | 40      | 6 000     | ~9,50 $      | 150 FCFA     |
| Pro         | 100     | 12 000    | ~19,00 $     | 120 FCFA     |

> ⭐ Pack recommandé pour la majorité des utilisateurs

### Économies par volume :
- Découverte → Starter : -16% par image
- Starter → Business : -10% par image
- Business → Pro : -25% par image (meilleure valeur)

---

## 4. Consommation des crédits

### Règle actuelle (MVP) :
- 1 image générée = 1 crédit débité
- Le débit est effectué **au moment de la génération**, pas à l'upload

### Règle future (Phase 3+) :
- Si une génération échoue pour raison technique : crédit **remboursé automatiquement**
- Si l'utilisateur annule avant la génération : crédit **non débité**
- Les crédits bonus (parrainage, offerts) sont traités identiquement aux crédits achetés

---

## 5. Politique de remboursement

### Cas éligibles à un remboursement de crédits :
| Situation                                 | Remboursement |
|-------------------------------------------|---------------|
| Erreur serveur pendant la génération      | ✅ Oui         |
| Image générée mais corrompue / illisible  | ✅ Oui         |
| Timeout sans résultat                     | ✅ Oui         |
| Insatisfaction sur la qualité             | ❌ Non         |
| Image déjà téléchargée et utilisée        | ❌ Non         |
| Demande de remboursement en argent réel   | ❌ Non (crédits uniquement) |

### Processus de remboursement (Phase 3) :
1. L'utilisateur signale le problème via le support
2. L'équipe vérifie les logs de génération
3. Si erreur technique confirmée : remboursement automatique des crédits dans les 24h

---

## 6. Crédits bonus (Phase 4+)

Certains événements pourront donner des crédits bonus :

| Événement               | Crédits offerts |
|-------------------------|-----------------|
| Inscription + 1er upload | 2 crédits       |
| Parrainage d'un ami      | 3 crédits       |
| Avis vérifié laissé      | 1 crédit        |
| Bug signalé confirmé     | 1–2 crédits     |

> Note : Les crédits bonus suivent les mêmes règles que les crédits achetés
> (pas d'expiration, remboursables si erreur technique).

---

## 7. Implémentation technique (Phase 2)

### Table `credit_balances` (Supabase) :
```sql
CREATE TABLE credit_balances (
  user_id     UUID PRIMARY KEY REFERENCES auth.users(id),
  total       INTEGER NOT NULL DEFAULT 0,  -- crédits disponibles
  used        INTEGER NOT NULL DEFAULT 0,  -- historique consommation
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### Table `credit_transactions` :
```sql
CREATE TABLE credit_transactions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES auth.users(id),
  amount        INTEGER NOT NULL,  -- positif = entrée, négatif = sortie
  type          TEXT NOT NULL,     -- 'purchase' | 'consumption' | 'refund' | 'bonus'
  description   TEXT,
  pack_id       TEXT,
  generation_id UUID,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
```

### Logique de débit (pseudo-code) :
```typescript
async function consumeCredit(userId: string, generationId: string) {
  // 1. Vérifier le solde
  const balance = await getBalance(userId);
  if (balance.total < 1) throw new Error('INSUFFICIENT_CREDITS');

  // 2. Débiter atomiquement
  await db.transaction(async (tx) => {
    await tx.decrement('credit_balances', { total: 1, used: +1 });
    await tx.insert('credit_transactions', {
      user_id: userId,
      amount: -1,
      type: 'consumption',
      generation_id: generationId,
    });
  });
}
```

---

## 8. Méthodes de paiement prévues (Phase 4)

| Méthode          | Pays ciblés                        | Statut     |
|------------------|------------------------------------|------------|
| Wave             | SN, CI, ML, BF, GN               | 🔜 Phase 4 |
| Orange Money     | SN, CI, ML, BF, GN, CM           | 🔜 Phase 4 |
| MTN Mobile Money | CI, BF, GN, BJ, CM               | 🔜 Phase 4 |
| Carte bancaire   | International (Visa/Mastercard)   | 🔜 Phase 4 |

---

*Dernière mise à jour : Juillet 2025*
