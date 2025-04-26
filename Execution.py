# .py

all_PFAs = []

def create_PFA(title, content, author):
    PFA = PFA(title,content,author)
    all_PFAs.append(PFA)
    return PFA

def list_PFAs():
    return all_PFAs

def filter_PFA(PFA_id):
    for pfa in all_pfa:
        if pfa.id == pfa_id:
            return pfa
    return None

def reply_PFA(pfa_id, content, author):
    pfa = filter_PFA(PFA_id)
    if pfa:
        reply = reply(conent, author)
        pfa.add_reply(reply)
        return reply
    else:
        return None
