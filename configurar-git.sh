#!/bin/bash

# =========================================================================
# GUIA DE APRENDIZADO: CONFIGURAÇÃO DE REPOSITÓRIO E SSH (CONTA RFD)
# =========================================================================
# Este arquivo serve como histórico dos comandos usados para isolar o
# projeto atual e configurar a chave de segurança para o GitHub.
#
# Para executar este arquivo no futuro, use: ./configurar-git.sh
# =========================================================================

echo "====== Iniciando Configuração do Git ======"

# 1. Inicializa o Git (cria o cérebro oculto do repositório nesta pasta)
git init

# 2. Altera o nome da linha do tempo principal para 'main' (padrão do GitHub)
git branch -M main

# 3. Cria o arquivo de proteção para ignorar lixo oculto do Mac (como .DS_Store)
echo ".DS_Store" > .gitignore

# 4. Configura a Identidade Local (Garante que os commits usem o e-mail da RFD)
git config user.name "Leonardo Amaral"
git config user.email "seu-email-da-rfd@exemplo.com"

# 5. Salva o ponto zero no histórico local
git add .
git commit -m "Commit inicial: branch main e .gitignore configurado"

# 6. Gera a chave SSH criptografada (pressione ENTER nas perguntas se rodar de novo)
if [ ! -f ~/.ssh/id_ed25519_rfd ]; then
    echo "Gerando chave SSH para a RFD..."
    ssh-keygen -t ed25519 -C "seu-email-da-rfd@exemplo.com" -f ~/.ssh/id_ed25519_rfd
else
    echo "Chave SSH já existe. Pulando geração."
fi

# 7. Copia a chave para a área de transferência do Mac (Pronta para o Command+V)
pbcopy < ~/.ssh/id_ed25519_rfd.pub

echo "====== Configuração Concluída com Sucesso! ======"
echo "A sua chave SSH já foi copiada. Vá para o GitHub e cole-a nas configurações."
