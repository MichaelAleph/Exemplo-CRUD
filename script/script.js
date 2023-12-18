const modal = document.getElementById('modal');
        const form = document.getElementById('personForm');
        const table = document.getElementById('personTable');

        const passo1 = document.getElementById('passo1');
        const passo2 = document.getElementById('passo2');
        const passo3 = document.getElementById('passo3');

        let editIndex = -1;

        function validatePasso1() {
            let isValid = true;
            let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            const cpf = document.getElementById('cpf').value;
            const email = document.getElementById('email').value;

            if (cpf.length < 14) {
                alert('Digite o CPF');
                isValid = false;
            }

            if (isValid) {
                if (!validateCPF(cpf)) {
                    alert('Digite um CPF válido!');
                    isValid = false;
                } else if (editIndex === -1) {
                    for (let i = 1; i < table.rows.length; i++) {
                        const row = table.rows[i];

                        if (cpf === row.cells[0].textContent) {
                            isValid = false;

                            const editData = confirm('O CPF digitado já foi cadastrado. Deseja editar os dados?');

                            if (editData) {
                                const cpf = row.cells[0].textContent;
                                const email = row.cells[1].textContent;
                                const datanasc = row.cells[2].textContent;
                                const nome = row.cells[3].textContent;
                                const cep = row.cells[4].textContent;
                                const endereco = row.cells[5].textContent;
                                const numero = row.cells[6].textContent;
                                const complemento = row.cells[7].textContent;
                                const bairro = row.cells[8].textContent;
                                const cidade = row.cells[9].textContent;
                                const telefone = row.cells[10].textContent;

                                document.getElementById('cpf').value = cpf;
                                document.getElementById('email').value = email;
                                document.getElementById('datanasc').value = datanasc;
                                document.getElementById('nome').value = nome;
                                document.getElementById('cep').value = cep;
                                document.getElementById('endereco').value = endereco;
                                document.getElementById('numero').value = numero;
                                document.getElementById('complemento').value = complemento;
                                document.getElementById('bairro').value = bairro;
                                document.getElementById('cidade').value = cidade;
                                document.getElementById('telefone').value = telefone;

                                editIndex = row.rowIndex;
                            }

                            break;
                        }
                    }
                }
            }

            if (isValid && email.length === 0) {
                alert('Digite o email');
                isValid = false;
            }

            if (isValid && !re.test(email)) {
                alert('Digite um email válido!');
                isValid = false;
            }

            if (isValid) {
                passo1.style.display = 'none';
                passo2.style.display = 'block';
            }
        }

        function validatePasso2() {
            let isValid = true;
            let matchdata = new RegExp(/((0[1-9]|[12][0-9]|3[01])\/(0[13578]|1[02])\/[12][0-9]{3})|((0[1-9]|[12][0-9]|30)\/(0[469]|11)\/[12][0-9]{3})|((0[1-9]|1[0-9]|2[0-8])\/02\/[12][0-9]([02468][1235679]|[13579][01345789]))|((0[1-9]|[12][0-9])\/02\/[12][0-9]([02468][048]|[13579][26]))/gi);

            const datanasc = document.getElementById('datanasc').value;
            const partesData = datanasc.split('/');
            const dataObj = new Date(partesData[2], partesData[1] - 1, partesData[0]);

            const nome = document.getElementById('nome').value;

            if (datanasc.length < 10) {
                alert('Digite a data de nascimento');
                isValid = false;
            }

            if (isValid && (!datanasc.match(matchdata) || dataObj > new Date())) {
                alert('Digite uma data de nascimento válida!');
                isValid = false;
            }

            if (isValid && (nome.length === 0 || !nome.includes(' '))) {
                alert('Digite o nome completo');
                isValid = false;
            }

            if (isValid) {
                passo2.style.display = 'none';
                passo3.style.display = 'block';
            }
        }

        function validatePasso3() {
            let isValid = true;

            const cep = document.getElementById('cep').value;
            const endereco = document.getElementById('endereco').value;
            const numero = document.getElementById('numero').value;
            const complemento = document.getElementById('complemento').value;
            const bairro = document.getElementById('bairro').value;
            const cidade = document.getElementById('cidade').value;
            const telefone = document.getElementById('telefone').value;

            if (cep.length < 9) {
                alert('Digite o CEP');
                isValid = false;
            }

            if (isValid && endereco.length === 0) {
                alert('Digite o endereço');
                isValid = false;
            }

            if (isValid && numero.length === 0) {
                alert('Digite o número');
                isValid = false;
            }

            if (isValid && bairro.length === 0) {
                alert('Digite o bairro');
                isValid = false;
            }

            if (isValid && cidade.length === 0) {
                alert('Digite a cidade');
                isValid = false;
            }

            if (isValid && telefone.length < 13) {
                alert('Digite o telefone');
                isValid = false;
            }

            if (isValid) {
                form.requestSubmit();
            }
        }

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const cpf = document.getElementById('cpf').value;
            const email = document.getElementById('email').value;
            const datanasc = document.getElementById('datanasc').value;
            const nome = document.getElementById('nome').value;
            const cep = document.getElementById('cep').value;
            const endereco = document.getElementById('endereco').value;
            const numero = document.getElementById('numero').value;
            const complemento = document.getElementById('complemento').value;
            const bairro = document.getElementById('bairro').value;
            const cidade = document.getElementById('cidade').value;
            const telefone = document.getElementById('telefone').value;

            if (editIndex === -1) {
                addPerson(cpf, email, datanasc, nome, cep, endereco, numero, complemento, bairro, cidade, telefone);
            } else {
                editPerson(editIndex, cpf, email, datanasc, nome, cep, endereco, numero, complemento, bairro, cidade, telefone);
                editIndex = -1;
            }

            closeModal();
            clearForm();
        });

        function addPerson(cpf, email, datanasc, nome, cep, endereco, numero, complemento, bairro, cidade, telefone) {
            const row = table.insertRow();

            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            const cell5 = row.insertCell(4);
            const cell6 = row.insertCell(5);
            const cell7 = row.insertCell(6);
            const cell8 = row.insertCell(7);
            const cell9 = row.insertCell(8);
            const cell10 = row.insertCell(9);
            const cell11 = row.insertCell(10);
            const cell12 = row.insertCell(11);

            cell1.textContent = cpf;
            cell2.textContent = email;
            cell3.textContent = datanasc;
            cell4.textContent = nome;
            cell5.textContent = cep;
            cell6.textContent = endereco;
            cell7.textContent = numero;
            cell8.textContent = complemento;
            cell9.textContent = bairro;
            cell10.textContent = cidade;
            cell11.textContent = telefone;
            cell12.innerHTML = '<button class="edit" onclick="openEditModal(this)">Editar</button>' +
                              '<button class="delete" onclick="deletePerson(this)">Excluir</button>';
        }

        function editPerson(index, cpf, email, datanasc, nome, cep, endereco, numero, complemento, bairro, cidade, telefone) {
            const row = table.rows[index];

            row.cells[0].textContent = cpf;
            row.cells[1].textContent = email;
            row.cells[2].textContent = datanasc;
            row.cells[3].textContent = nome;
            row.cells[4].textContent = cep;
            row.cells[5].textContent = endereco;
            row.cells[6].textContent = numero;
            row.cells[7].textContent = complemento;
            row.cells[8].textContent = bairro;
            row.cells[9].textContent = cidade;
            row.cells[10].textContent = telefone;
        }

        function deletePerson(button) {
            const row = button.closest('tr');
            table.deleteRow(row.rowIndex);
        }

        function openModal() {
            passo1.style.display = 'block';
            passo2.style.display = 'none';
            passo3.style.display = 'none';

            modal.style.display = 'block';
        }

        function openNewModal() {
            editIndex = -1;
            openModal();
        }

        function openEditModal(button) {
            const row = button.closest('tr');

            const cpf = row.cells[0].textContent;
            const email = row.cells[1].textContent;
            const datanasc = row.cells[2].textContent;
            const nome = row.cells[3].textContent;
            const cep = row.cells[4].textContent;
            const endereco = row.cells[5].textContent;
            const numero = row.cells[6].textContent;
            const complemento = row.cells[7].textContent;
            const bairro = row.cells[8].textContent;
            const cidade = row.cells[9].textContent;
            const telefone = row.cells[10].textContent;

            document.getElementById('cpf').value = cpf;
            document.getElementById('email').value = email;
            document.getElementById('datanasc').value = datanasc;
            document.getElementById('nome').value = nome;
            document.getElementById('cep').value = cep;
            document.getElementById('endereco').value = endereco;
            document.getElementById('numero').value = numero;
            document.getElementById('complemento').value = complemento;
            document.getElementById('bairro').value = bairro;
            document.getElementById('cidade').value = cidade;
            document.getElementById('telefone').value = telefone;

            editIndex = row.rowIndex;
            openModal();
        }

        function closeModal() {
            modal.style.display = 'none';
        }

        function clearForm() {
            form.reset();
        }

        function mascaraCpf(item) {
            var value = item.value;

            if (isNaN(value[value.length - 1])) {
                item.value = value.substring(0, value.length - 1);
                return;
            }

            item.setAttribute('maxlength', '14');

            if (value.length == 3 || value.length == 7) item.value += '.';
            if (value.length == 11) item.value += '-';
        }

        function mascaraData(item) {
            var value = item.value;

            if (isNaN(value[value.length - 1])) {
                item.value = value.substring(0, value.length - 1);
                return;
            }

            item.setAttribute('maxlength', '10');

            if (value.length == 2 || value.length == 5) item.value += '/';
        }

        function mascaraCep(item) {
            var value = item.value;

            if (isNaN(value[value.length - 1])) {
                item.value = value.substring(0, value.length - 1);
                return;
            }

            item.setAttribute('maxlength', '9');

            if (value.length == 5) item.value += '-';
        }

        function mascaraTelefone(item) {
            var value = item.value;

            if (isNaN(value[value.length - 1])) {
                item.value = value.substring(0, value.length - 1);
                return;
            }

            item.setAttribute('maxlength', '13');

            if (value.length == 2) item.value += ' ';
            if (value.length == 8) item.value += '-';
        }

        function validateCPF(cpf) {
            cpf = cpf.replace(/[^\d]+/g, '');
            if (cpf.length !== 11)
                return false;

            if (cpf === '00000000000' ||
                cpf === '11111111111' ||
                cpf === '22222222222' ||
                cpf === '33333333333' ||
                cpf === '44444444444' ||
                cpf === '55555555555' ||
                cpf === '66666666666' ||
                cpf === '77777777777' ||
                cpf === '88888888888' ||
                cpf === '99999999999')
                return false;

            var mt1 = new Array(10, 9, 8, 7, 6, 5, 4, 3, 2);
            var mt2 = new Array(11, 10, 9, 8, 7, 6, 5, 4, 3, 2);
            var tempCPF = cpf.substr(0, 9);
            var soma = 0;
            var digito;
            var resto;

            for (var i = 0; i < 9; i++) {
                soma += parseInt((tempCPF[i]).toString()) * mt1[i];
            }
            resto = soma % 11;
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;

            digito = resto.toString();
            tempCPF = tempCPF + digito;
            soma = 0;
            for (var j = 0; j < 10; j++) {
                soma += parseInt(tempCPF[j].toString()) * mt2[j];
            }
            resto = soma % 11;
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;

            digito = digito + resto.toString();
            return (cpf.substr(9, 11) === digito) ? true : false;
        }
